# Data Sources for Tutorials

| source                                                                  | format  | reference                                                                                                                                                                                                 | notes                                                                                                                                             |
| ----------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Pre-Class Survey Results](surveyResults.csv)                           | csv     | results taken from google form sent out before semesters start                                                                                                                                            |                                                                                                                                                   |
| [Squirrel Activities](squirrelActivities.csv)                           | csv     | [results taken from nyc open data](https://data.cityofnewyork.us/Environment/2018-Squirrel-Census-Fur-Color-Map/fak5-wcft), in [conjunction with the Squirrel Census](https://www.thesquirrelcensus.com/) |                                                                                                                                                   |
| [Politicians' Environmental Ratings](environmentRatings.json)           | json    | [LCV Environmental�Earth� Score](https://scorecard.lcv.org/members-of-congress) combined with [GovTrack Ideology Score](https://www.govtrack.us/congress/members/report-cards/2018/house/ideology)        | Researched, Cleaned, and compiled by Ellie Frymire                                                                                                |
| [Population Growth Over Time](populationOverTime.csv)                   | csv     | [Gap Minder](https://www.gapminder.org/data/documentation/gd003/) via [Our World In Data](https://ourworldindata.org/world-population-growth)                                                             |                                                                                                                                                   |
| [US GeoJson](usState.json)                                              | geojson | [Eric Tech](https://eric.clst.org/tech/usgeojson/) via [US Census Shapefiles](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html)                                  |                                                                                                                                                   |
| [Unusually Hot Temperatures](usHeatExtremes.csv)                        | csv     | [EPA and NOAA](https://www.epa.gov/climate-indicators/climate-change-indicators-high-and-low-temperatures)                                                                                                | "The term ?unusually hot? refers to a daily maximum temperature that is hotter than the 95th percentile temperature during the 1948?2015 period." |
| [TV Shows and Movies listed on Netflix](netflix_titles_with_genres.csv) | csv     | [Kaggle](https://www.kaggle.com/shivamb/netflix-shows/data#)                                                                                                                                              | Some manipulation was done to add a 'genre' column based on the 'listed_in' column                                                                |
| [Flare Library](flare.json)                                             | json    | [Observable](https://observablehq.com/collection/@d3/d3-hierarchy)                                                                                                                                        | The file is references in most observables using hierarchical data. "Flare" is an old adobe flash library for data visualizations.                |
| [ACS Data](statePopulations.csv)                                             | csv    | [Census Data Website](https://data.census.gov/cedsci/table?g=0100000US.04000.001&hidePreview=false&t=Population%20Total&tid=ACSDP1Y2010.DP05&vintage=2010&tp=true)                                                                                                                                        |                 |