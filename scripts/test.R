# Install local version
# setwd("~/Documents/GIT/xaperid3js")
# devtools::install()

# install version from github
library(devtools)
install_github("xaperi/xaperid3js",auth_token="5696500e9d9bba7406bdc1f952c45da20cf5bf8c",ref="production")

# test code
library("xaperid3js")
# D3Gauge(0.8056,title="dit is een test titel", title2="dit is een extra titel")

