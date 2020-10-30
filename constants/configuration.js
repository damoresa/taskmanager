const configuration = {
    'database': process.env.ATLAS_MONGODB_URI,
    'hashSecret': process.env.HASH_SECRET,
};
module.exports = configuration;
