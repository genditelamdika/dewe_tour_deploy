package tripdto

import "tour/models"

type TripResponse struct {
	ID             int            `json:"id"`
	Title          string         `json:"title" form:"title" gorm:"type: varchar(255)"`
	CountryID      int            `json:"countryid" `
	Country        models.Country `json:"country"`
	Acommodation   string         `json:"acommodation" form:"acommodation" gorm:"type: varchar(255)"`
	Transportation string         `json:"transportasion" form:"transportasion" gorm:"type: varchar(255)"`
	Eat            string         `json:"eat" form:"eat" gorm:"type: varchar(255)"`
	Day            int            `json:"day" form:"day" gorm:"type: int"`
	Night          int            `json:"night" form:"night" gorm:"type: int"`
	DateTrip       string         `json:"datetrip" form:"datetrip" gorm:"type: varchar(255)"`
	Price          int            `json:"price" form:"price" gorm:"type: int"`
	Quota          int            `json:"quota" form:"quota" gorm:"type: int"`
	Description    string         `json:"description" form:"description" gorm:"type: varchar(255)"`
	Image          string         `json:"image" form:"image" gorm:"type: varchar(255)"`
}
