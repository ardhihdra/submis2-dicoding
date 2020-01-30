const { BlobServiceClient } = require('@azure/storage-blob');
const uuidv1 = require('uuid/v1');

async function initBlob() {
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    console.log('\nCreating container...');
    console.log('\t', containerName);

    // Create a unique name for the container
    const containerName = 'quickstart' + uuidv1();
    
    // Get a reference to a container
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    
    const createContainerResponse = await containerClient.create();
    console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
    return containerClient;
}

module.exports = {
    initBlob
}