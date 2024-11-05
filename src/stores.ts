import {deserializeObject, Endpoint, serializeObject} from "@simplito/privmx-webendpoint-sdk";
import {env, selectFile} from "./lib.ts";

export async function runStore() {
    /*
      Stores are a structured data storage and communication tool used for file exchange and management.
      Users create Stores to organize topic-specific spaces where they can securely upload encrypted files and share
      them with designated participants. All the active users are notified right away when a file is
      uploaded or modified. Stores can be integrated with Threads.
    */
    console.info("Creating store");
    const storeId = await Endpoint.connection().stores.new({
        contextId: env.CONTEXT_ID,
        privateMeta: serializeObject({
            name: "Test Store"
        }),
        users: [{pubKey: env.USER_PUBLIC_KEY, userId: env.USER_ID}],
        managers: [{pubKey: env.USER_PUBLIC_KEY, userId: env.USER_ID}],
    });
    console.info("Store created with id " + storeId);

    const store = Endpoint.connection().store(storeId);

    /*
      Stores support streaming files in chunks. Each file can contain optional private metadata and public metadata.
      Public meta isn't encrypted before sending, this allows your server to look in to its contents.
     */
    const file = await selectFile()
    console.info(`Sending file: "${file.name}" to store "Test store"`);
    const id = await store.uploadFile({
        file,
        privateMeta: serializeObject({
            mimeType: file.type,
            name: file.name,
        }),
    });
    console.log("File sent new file id: ", id);

    /*
        You can get list of files ( without contents ) using `getFiles`
     */
    console.log("Getting file list from Store");
    const files = await store.getFiles();
    console.log("Files in store", files);

    /*
    * Endpoint takes care of encryption but because data is sent in binary (Uint8Array) format you have to
    * deserialize it first.
    */
    const sentFile = files.readItems[0]
    const fileName = deserializeObject(sentFile.privateMeta).name

    /*
    Endpoint has built in method for download files using streaming.
     */
    await Endpoint.connection().stores.downloadFile({fileName, fileId: sentFile.info.fileId})

    console.log("Renaming store");

    /*
     * We can change name or add/remove user from Store using `storeUpdate`
     * It will override all fields using those passed to the storeUpdate
     */
    await store.update({
        privateMeta: serializeObject({
            title: "New name for store"
        }),
        users: [{pubKey: env.USER_PUBLIC_KEY, userId: env.USER_ID}],
        managers: [{pubKey: env.USER_PUBLIC_KEY, userId: env.USER_ID}],
        version: 1,
    });

    /*
     * Store info contains useful data about creation, last updates and its statistics.
     */
    console.log("Getting info about store");
    const storeInfo = await store.info();
    console.log("Store info", storeInfo);
}
