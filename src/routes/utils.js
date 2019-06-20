
const openGISURL =  "http://www.opengis.net/def/crs/EPSG/0/"


// Extract bbox  from mapServerJSON in format [[-180, -90, 180, 90]]
exports.getBbox = (mapServerJson) =>
{
            // lower corner, upper corner
            const bbox = [ [ 
                mapServerJson.fullExtent.xmin, 
                mapServerJson.fullExtent.ymin, 
                mapServerJson.fullExtent.xmax, 
                mapServerJson.fullExtent.ymax ] ] ;
            return bbox;

};


exports.GetMapServiceName = () =>
{
    var mapServiceParts = process.env.ESRI_SERVICE.split("/");
    return mapServiceParts[mapServiceParts.length - 1];
}


// Extract crs  from mapServerJSON in format http://www.opengis.net/def/crs/EPSG/0/4326
exports.getCRS = (mapServerJson) =>
{
    crs = mapServerJson.fullExtent.spatialReference.latestWkid;
    return openGISURL + crs ;
}