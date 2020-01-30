
const { Request } = require('tedious');
const { initBlob } = require('./blob')
var fs = require('fs');

async function postData(req, res, connection, containerClient) {
    console.log(req.body)

    const request = new Request(
      `INSERT INTO dbo.books (name, writer, filename)
       VALUES ('${req.body.name}', '${req.body.hobby}')`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );
    try {
        // store to DB
        // connection.execSql(request);
        
        // // store img to Blob
        // const blobName = 'quickstart' + uuidv1() + '.txt';
        // // Get a block blob client
        // const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        // console.log('\nUploading to Azure storage as blob:\n\t', blobName);

        // // Upload data to the blob
        // const filepath = path.join(__dirname, '/protected/temp');
        // const uploadBlobResponse = await blockBlobClient.uploadFile(filepath);
        // console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

        res.sendFile('index.html', {root: './views' });
        

    } catch (err) {
      console.log(err)
      res.send({msg: 'gagal'});
    }
  }
  
  async function getData(req, res, connection, containerClient) {
    const query = `SELECT TOP (100) [name],[writer] FROM [dbo].[books]`;
    const request = new Request(query,async (err, rowCount, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`${rowCount} row(s) returned`);
            console.log('list data', rows);
            
            // console.log('\nListing blobs...');
            // // List the blob(s) in the container.
            // for await (const blob of containerClient.listBlobsFlat()) {
            //     console.log('\t', blob.name);
            //     const blockBlobClient = containerClient.getBlockBlobClient(blobName);     
            //     const downloadBlockBlobResponse = await blockBlobClient.downloadToFile(0);
            // }
            // console.log('\nDownloaded blob content...');
            // // console.log('\t', await streamToString(downloadBlockBlobResponse.readableStreamBody));
            // await streamToString(downloadBlockBlobResponse.readableStreamBody)

            sendData(rows, res)
        }
      }
    );
    try {
      connection.execSql(request);
    } catch (err) {
      console.log(err)
      res.send({msg: 'gagal'});
    }
  }
  
  function sendData(list, res) {
    let data = '';
    list.forEach(function(values,index) {
      data += '<div>'
      values.forEach(function (value, index) {
        // console.log(JSON.stringify(value))
        data += value.value
      })
      data += '</div>'
    })
  
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>List of Hobbies</title>
      </head>
      <body>
          <div  align="center">
          <form action="/" method="get">
            <input type="submit" value="back"/>
          </form> 
              ` + data + 
              `
          </div>
      </body>
      </html>  
    `)
  }

  module.exports = {
      postData,
      getData,
      sendData
  }