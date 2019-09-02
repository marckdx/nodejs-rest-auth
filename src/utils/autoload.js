const watch = (folder) =>
{
    var normalizedPath = require("path").join(__dirname, "routes");

    require("fs").readdirSync(normalizedPath).forEach(function(file) {
        require(`./src/${folder}/${file}`);
    });
}

module.exports = watch;