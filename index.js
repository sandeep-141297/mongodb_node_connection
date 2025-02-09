const { MongoClient } = require("mongodb");

// for local server previous we connected with the help of mongosh on cmd
const uri = 'mongodb://127.0.0.1';
const client = new MongoClient(uri);

const dataAdd = {
    name: "Designer Handbag1",
    company: "64c23350e32f4a51b19b923a",
    price: 3466,
    colors: ["#000000", "#cc6600", "#663300"],
    image: "/images/product-handbag.png",
    category: "64c2342de32f4a51b19b9250",
    isFeatured: true,
};

// fat-arrow function
// always promise return type string
const main = async () => {
    // this is like 'mongosh' & always promise return 
    await client.connect();
    // connect db name 'shop'
    const db = client.db('shop');
    // get collection 'products'
    const collection = db.collection("products");

    await collection.insertOne(dataAdd);

    // select date from collection & always promise return 
    const dataSelect = await collection.find({price: {$eq: 3466}}).toArray();
    // const dataSelect = await collection.find({price: {$gt: 1200}}).toArray();

    console.log(dataSelect);
    return "done";

}

// if any function promise handle than when we call we need to handle promise as well
// () => client.close() if direct close topolosy is closed show thats why () => use fat arrow
main().then(console.log()).catch((e) => console.log(e)).finally(() => client.close());
