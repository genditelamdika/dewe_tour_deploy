package repositories

import (
	"tour/models"

	"gorm.io/gorm"
)

type TripRepository interface {
	FindTrips() ([]models.Trip, error)
	GetTrip(ID int) (models.Trip, error)
	CreateTrip(trip models.Trip) (models.Trip, error)
	UpdateTrip(trip models.Trip, Id int) (models.Trip, error)
	DeleteTrip(trip models.Trip) (models.Trip, error)
	UpdateFullcounter(trip models.Trip) (models.Trip, error)
	GetCountrytrip(ID int) (models.Country, error)
	// GetCategoryfilm(ID int) (models.Category, error)
}

func RepositoryTrip(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTrips() ([]models.Trip, error) {
	var trips []models.Trip
	err := r.db.Preload("Transaction").Preload("Country").Find(&trips).Error

	return trips, err
}

func (r *repository) GetTrip(ID int) (models.Trip, error) {
	var trip models.Trip
	err := r.db.Preload("Transaction").Preload("Country").First(&trip, ID).Error

	return trip, err
}

func (r *repository) CreateTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Preload("Country").Create(&trip).Error

	return trip, err
}
func (r *repository) UpdateTrip(trip models.Trip, Id int) (models.Trip, error) {
	err := r.db.Model(&trip).Updates(&trip).Error

	return trip, err
}

// func (r *repository) UpdateTrip(trip models.Trip) (models.Trip, error) {
// 	err := r.db.Transaction(func(db *gorm.DB) error {
// 		if err := r.db.Preload("Country").Model(&trip).Updates(&trip).Error; err != nil {
// 			return err
// 		}
// 		if err := r.db.Exec("UPDATE trips SET country_id=? WHERE id=?", trip.CountryID, trip.ID).Error; err != nil {
// 			return err
// 		}
// 		return nil
// 	})
// 	return trip, err
// }

// func (r *repository) UpdateFullcounter(trip models.Trip) (models.Trip, error) {
// 	err := r.db.Preload("Country").Preload("Transaction").Save(&trip).Error

//		return trip, err
//	}
func (r *repository) UpdateFullcounter(trip models.Trip) (models.Trip, error) {
	var counterQty int
	err := r.db.Model(&models.Transaction{}).Select("SUM(counterqty)").Where("trip_id = ?", trip.ID).Scan(&counterQty).Error
	if err != nil {
		return trip, err
	}

	trip.Fullcounter += counterQty

	err = r.db.Preload("Country").Preload("Transaction").Save(&trip).Error
	return trip, err
}

func (r *repository) DeleteTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Delete(&trip).Error

	return trip, err
}

func (r *repository) GetCountrytrip(Id int) (models.Country, error) {
	var country models.Country
	err := r.db.First(&country, Id).Error
	return country, err
	// err := r.db.Delete(&film).Error

	// return cate, err
}
