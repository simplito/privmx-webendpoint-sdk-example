import {deserializeObject, Endpoint, serializeObject} from "@simplito/privmx-webendpoint-sdk";
import {env} from "./lib.ts";

export async function runThread() {
    /*
        Threads are a structured communication tool used for message based communication.
        Users create Threads to organize topic-specific conversations where they can securely exchange encrypted messages with designated participants. All the active users are notified right away when a new message arrives or anything within the Thread changes.
        All the data is stored in the Bridge and can be freely shared between its users.

        To learn more about Threads and PrivMX Platform in general check out our docs https://docs.privmx.cloud
     */

    /*
     * To create Thread you must specify in which Context (created earlier in PrivMX Bridge) it will be located,
     * who will have access to it and optional private / public meta.
     */

    console.log("Creating new thread");
    const threadId = await Endpoint.connection().threads.new({
        contextId: env.CONTEXT_ID,
        privateMeta: serializeObject({
            name: "Test thread"
        }),
        users: [{userId: env.USER_ID, pubKey: env.USER_PUBLIC_KEY}],
        managers: [{userId: env.USER_ID, pubKey: env.USER_PUBLIC_KEY}],
        policies:{
            update:"all",
            item:{
                listAll:"all"
            }
        }
    });
    console.log("New thread created");

    /*
     * You can get list of our Thread inside Context
     */
    console.log("Getting list of threads");
    const threads = await Endpoint.connection().threads.list({
        contextId: env.CONTEXT_ID,
    });

    /*
     * Endpoint takes care of encryption but because data is sent in binary (Uint8Array) format you have to
     * deserialize it first.
    */
    console.log("List of threads: ", threads.readItems.map(item => {
        const privateMeta = deserializeObject(item.privateMeta)
        return {
            ...item,
            name:privateMeta.name
        }
    }));

    /*
      Now with Thread created you can send first encrypted message.

      Messages inside Threads consists of three fields.
      Data is a content of Message, private meta is a metadata about message that will be encrypted before sending and
      public meta is a metadata that won't be encrypted before sending, which allows your server to read it.

      In this example public meta will contain type of message, for example "text/plain"
    */
    console.log("Sending message to Thread");
    const thread = Endpoint.connection().thread(threadId);
    const msgId = await thread.sendMessage({
        data: serializeObject({
            text: "New message"
        }),
        publicMeta:new TextEncoder().encode("text/plain"),

    });
    console.log("Message sent" + msgId);

    /*
     * After sending, we can download a list of all messages.
     * Remembering to deserialize data from Uint8Array to objects and text.
     */
    const messages = await thread.getMessages();
    const decoder = new TextDecoder();
    const deserializedMessages = messages.readItems.map(message => ({
        ...message,
        data: deserializeObject(message.data),
        publicMeta: decoder.decode(message.publicMeta)
    }));
    console.log("Thread messages", deserializedMessages);
}
