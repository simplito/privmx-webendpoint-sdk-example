
export const env = {
  /**
   * Solution groups related instances and contexts inside organizations
   */
  SOLUTION_ID: "5a309546-0140-4bb9-901c-e9e427e81eaa",

  /**
   * ID of context located inside solution
   */
  CONTEXT_ID: "2d4f7d7f-7bc6-4e31-b1fd-05122d0d5c96",

  /**
   * Bridge URL is a link to Bridge instance that manages
   * all logic for Threads, Stores, Inboxes and Keys management
   */
  BRIDGE_URL: "http://localhost:9111",

  /**
   * User's Public key and userId must be first registered inside Privmx Bridge. Check README for more info.
   */
  USER_PUBLIC_KEY: "7xhjbLo6rdsYMoTyY38aQp4Uy9Q6GGnayihk5xEDLJrYdvk9CZ",
  USER_ID: "hubert",
};


export async function selectFile(){
  const input = document.createElement("input");
  input.type = "file";
  const selectedFile = await new Promise<File>((resolve) => {
    input.addEventListener("change", async (e) => {
      const file = (e.target as unknown as { files: File[] }).files[0];
      resolve(file);
    });

    input.click();
  });
  return selectedFile
}