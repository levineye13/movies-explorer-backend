module.exports.returnMongoURI = ({ ip, port, name }) =>
  `mongodb://${ip}:${port}/${name}`;
