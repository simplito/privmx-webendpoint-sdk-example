
export const env = {
  /**
   * Solution groups related instances and contexts inside organizations
   */
  SOLUTION_ID: import.meta.env.VITE_SOLUTION_ID,

  /**
   * ID of context located inside solution
   */
  CONTEXT_ID: import.meta.env.VITE_CONTEXT_ID,

  /**
   * Bridge URL is a link to Bridge instance that manages
   * all logic for Threads, Stores, Inboxes and Keys management
   */
  BRIDGE_URL: "http://localhost:9111",

  /**
   * User's Public key and userId must be first registered inside Privmx Bridge. Check README for more info.
   */
  USER_PUBLIC_KEY: import.meta.env.VITE_USER_PUBLIC_KEY,
  USER_PRIVATE_KEY: import.meta.env.VITE_USER_PRIVATE_KEY,
  USER_ID: import.meta.env.VITE_USER_ID,
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