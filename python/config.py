import os
#
# Directories setup
#
DATA_DIR			= os.environ['WORKSHOP_DIR'] + "/data"
PYTHON_DIR			= os.environ['WORKSHOP_DIR'] + "/python"
#
# Height Above NEarest Drainage (HAND)
#
HANDS_DIR			= os.path.join(DATA_DIR, "HAND")
HYDROSHEDS_DIR		= os.path.join(DATA_DIR, "HydroSHEDS")

# HAND regional area.
#HANDS_AREA			= "haiti"
#HANDS_ZONE			= "CA"		# Central America
HANDS_AREA			= "namibia"
HANDS_ZONE			= "AF"		# Africa

# Pick 9m or 15m but <= 18m
HANDS_HEIGHT		= 9

# S3 bucket to store data and publish it
BUCKET				= "ojo-workshop"

regions		= {
	'd02': {
		'name':			"Central America",
		'bbox': 		[-92.6833333,   6.1666667, -75.8500000,  19.0833333],
		'bucket':		"ojo-d2",
		'thn_zoom': 	5
	},
	'd03': {
		'name':			"Hispaniola",
		'bbox': 		[-74.9416667, 16.3500000, -64.9750000,  21.4250000],
		'bucket':		"ojo-d3",
		'thn_zoom': 	6
	},
	'd04': {
		'name':			"Namibia",
		'bbox': 		[18, -21, 26, -17 ],
		'bucket':		"rcmrd-products",
		'thn_zoom': 	6
	},
	'd05': {
		'name':			"Malawi",
		'bbox': 		[32.6690, -17.1295, 35.9204, -9.3647 ],
		'bucket':		"rcmrd-products",
		'thn_zoom': 	6
	},
	'd06': {
		'name':			"Pakistan",
		'bbox': 		[60, 20, 80, 40 ],
		'bucket':		"ojo-d6",
		'thn_zoom': 	6
	}
}
	
#
# Data Directories
#
LANDSAT8_DIR				= os.path.join(DATA_DIR, "l8")
RADARSAT2_DIR				= os.path.join(DATA_DIR, "radarsat2")
MODIS_DIR					= os.path.join(DATA_DIR, "modis")
MODIS_ACTIVE_FIRES_DIR		= os.path.join(DATA_DIR, "modis_af")
MODIS_ACTIVE_FIRES_RCMRD	= os.path.join(DATA_DIR, "modis_af_r")
MODIS_BURNEDAREAS_DIR		= os.path.join(DATA_DIR, "modis_burnedareas")
EO1_DIR						= os.path.join(DATA_DIR, "eo1_ali")
DFO_DIR						= os.path.join(DATA_DIR, "dfo")
PALSAR2_DIR					= os.path.join(DATA_DIR, "palsar2")
FROST_DIR					= os.path.join(DATA_DIR, "frost")
DIGIGLOBE_DIR				= os.path.join(DATA_DIR, "digiglobe")
VIIRS_DIR					= os.path.join(DATA_DIR, "viirs")
CSV_DIR						= os.path.join(DATA_DIR, "csv")
EF5_DIR						= os.path.join(DATA_DIR, "ef5")
MAXQ_DIR					= os.path.join(DATA_DIR, "maxq")
MAXSWE_DIR					= os.path.join(DATA_DIR, "maxswe")
SM_DIR						= os.path.join(DATA_DIR, "sm")
TRMM_DIR					= os.path.join(DATA_DIR, "trmm_24")
GPM_DIR						= os.path.join(DATA_DIR, "gpm_24")
LS_DIR						= os.path.join(DATA_DIR, "ls")
QUAKES_DIR					= os.path.join(DATA_DIR, "quakes")
VIIRS_CHLA_DIR				= os.path.join(DATA_DIR, "viirs_chla")
CHIRPS_PRELIM_DIR			= os.path.join(DATA_DIR, "chirps2_prelim")

SRTM2_DIR				= "/shared/production/proddata/srtm2"

version = "1.0 alpha3"

profile = 'mercator'
files = []
nodata = None
srs = ""
customsrs = ""
srsformat = 0
tminz = 0
tmaxz = 0
resume = False
kml = False
outputdir = ""
url = "http://" # TODO: Do not submit this to the command-line
viewer_google = False
viewer_openlayers = False
title = ""
copyright = "&copy;"
googlekey = ""
yahookey = ""

documentsdir = ""

bboxgeoref = False


# Placeholder for GetText
def _(str):
	return str

# WellKnownGeogCS
wellknowngeogcs = ['WGS84','WGS72','NAD27','NAD83']

# Subset of the GDAL supported file formats...
supportedfiles =  "Supported raster files|*.tif;*.tiff;*.kap;*.img;*.sid;*.ecw;*.jp2;*.j2k;*.nitf;*.h1;*.h2;*.hd;*.hdr;*.cit;*.rgb;*.raw;*.blx;*.jpg;*.jpeg;*.png;*.gif;*.bmp;*.wms;*.vrt|" \
	"TIFF / BigTIFF / GeoTIFF (.tif)|*.tif;*.tiff|" \
	"BSB Nautical Chart Format (.kap)|*.kap|" \
	"JPEG2000 - JPEG 2000 (.jp2, .j2k)|*.jp2;*.j2k|" \
	"MrSID - Multi-resolution Seamless Image Database (.sid)|*.sid|" \
	"ECW - ERMapper Compressed Wavelets (.ecw)|*.ecw|" \
	"HFA - Erdas Imagine Images (.img)|*.img|" \
	"NITF - National Imagery Transmission Format (.nitf)|*.nitf|" \
	"NDF - NLAPS Data Format (.h1,.h2,.hd)|*.h1;*.h2;*.hd|" \
	"MFF - Vexcel MFF Raster (.hdr)|*.hdr|" \
	"INGR - Intergraph Raster Format (.cit,.rgb,..)|*.cit;*.rgb|" \
	"EIR -- Erdas Imagine Raw (.raw)|*.raw|" \
	"BLX -- Magellan BLX Topo File Format (.blx)|*.blx|" \
	"JPEG - Joint Photographic Experts Group JFIF (.jpg)|*.jpg;*.jpeg|" \
	"PNG - Portable Network Graphics (.png)|*.png|" \
	"GIF - Graphics Interchange Format (.gif)|*.gif|" \
	"BMP - Microsoft Windows Device Independent Bitmap (.bmp)|*.bmp|" \
	"WMS - GDAL driver for OGC Web Map Server (.wms)|*.wms|" \
	"VRT - GDAL Virtual Raster (.vrt)|*.vrt|" \
	"All files (*.*)|*.*"

s = """
srsFormatList = ['format automatically detected',
        'WKT - Well Known Text definition',
        'ESRI WKT - Well Known Text definition',
        'EPSG number',
        'EPSGA number',
        'Proj.4 definition'
]
"""

srsFormatList = [
'Custom definition of the system (WKT, Proj.4,..)',
'WGS84 - Latitude and longitude (geodetic)',
'Universal Transverse Mercator - UTM (projected)',
'Specify the id-number from the EPSG/ESRI database',
'Search the coordinate system by name',
]

srsFormatListLocal = [
'SRSCustom0',"SRSDefinition0",
'SRSCustom1',"SRSDefinition1",
'SRSCustom2',"SRSDefinition2",
'SRSCustom3',"SRSDefinition3",
'SRSCustom4',"SRSDefinition4",
'SRSCustom5',"SRSDefinition5",
'SRSCustom6',"SRSDefinition6",
'SRSCustom7',"SRSDefinition7",
'SRSCustom8',"SRSDefinition8",
'SRSCustom9',"SRSDefinition9"
]

#English-speaking coordinate systems defaults:
# 'OSGB 1936 / British National Grid (projected)'
# 'NZMG - New Zealand Map Grid'
# ''

#French-speaking coordinate systems defaults:
# Lambert

#German-speaking coordinate systems defaults:
# ...

s = """
#A = wx.PySimpleApp()
#A.SetAppName(VENDOR_NAME)

datadir = wx.StandardPaths.Get().GetUserLocalDataDir()
if not os.path.isdir(datadir):
    os.mkdir(datadir)
f = wx.FileConfig(localFilename=os.path.join(datadir,'MapTiler.cfg'))

f.SetPath("APath")
print f.Read("Key")
f.Write("Key", "Value")
f.Flush()
"""

epsg4326 = """GEOGCS["WGS 84",
    DATUM["WGS_1984",
        SPHEROID["WGS 84",6378137,298.257223563,
            AUTHORITY["EPSG","7030"]],
        AUTHORITY["EPSG","6326"]],
    PRIMEM["Greenwich",0,
        AUTHORITY["EPSG","8901"]],
    UNIT["degree",0.01745329251994328,
        AUTHORITY["EPSG","9122"]],
    AUTHORITY["EPSG","4326"]]"""