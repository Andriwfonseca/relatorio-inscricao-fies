const converter = require('api-spec-converter');
const config = require('config');
const fs = require('fs');
//api-spec-converter --from=openapi_3 --to=swagger_2 --syntax=yaml --order=alpha http://localhost:4042/swagger-json > swagger.yaml

converter.convert({
    from: 'openapi_3',
    to: 'swagger_2',
    source: `http://localhost:${config.get('port')}/swagger-json`,
    syntax: 'yaml',
    order: 'alpha'
}).then(function (converted) {
    converted.fillMissing();
    var options = { syntax: 'yaml', order: 'alpha' }
    fs.writeFileSync('swagger/swagger.yaml', converted.stringify(options));
});
