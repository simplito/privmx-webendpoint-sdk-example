import "./style.css";
import typescriptLogo from "./typescript.svg";
import {Endpoint } from "@simplito/privmx-webendpoint-sdk";
import {env} from "./lib";
import {runThread} from "./threads.ts";
import {runStore} from "./stores.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Minimal PrivMX Endpoint</h1>
    <p class="read-the-docs">
      Open console to use endpoint methods
    </p>
   <div class="stack">
      <button id="user">Connect to PrivMX </button>
      <button id="thread">Run Thread example</button>
      <button id="store">Run Store example</button>
   </div>

  </div>
`;

async function connect() {
    /**
     *Before user execute any Platform methods they have to connect to it first.
     */
    console.log("Initializing cloud endpoint");
    await Endpoint.connect({
        privKey: "L3DuFB7vYMcb6Jc4SuNrUmGbZXrBWoJfUDRqf4aieMGXiESHP6BT",
        bridgeUrl: env.BRIDGE_URL,
        solutionId: env.SOLUTION_ID,
    });
    console.log("Endpoint context created");
}

function main() {
    const storeButton = document.querySelector("button#store");
    const threadButton = document.querySelector("button#thread");
    const mainButton = document.querySelector("button#user");

    storeButton?.addEventListener("click", runStore);
    threadButton?.addEventListener("click", runThread);
    mainButton?.addEventListener("click", connect);
}

main();
