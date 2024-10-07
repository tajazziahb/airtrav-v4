import supabase from "./config.js";
/**
 * Gets all the plan in the database
 * @returns {[{publishedBy: string, publishedOn: string, id: number, title: string, content: string},{publishedBy: string, publishedOn: string, id: number, title: string, content: string},{publishedBy: string, publishedOn: string, id: number, title: string, content: string},{publishedBy: string, publishedOn: string, id: number, title: string, content: string},{publishedBy: string, publishedOn: string, id: number, title: string, content: string},null,null,null,null,null]}
 */
export async function getPlans() {

    let { data, error } = await supabase
      .from('travel_plans')
      .select('*')
    return data;
}

export async function addPlans(newPlans = {}){
    // TODO: make this work (that is: when I click the submit plans, it adds a new plan to your supabase database) — ref: see my `prompt.md` file
    // uses the supabase library to add a new plan
    // return new plan if successfully
    // return an error and the type if couldn't to supabase
}

/**
 * Deletes a plan by its ID
 *
 * @param id
 */
export function deletePlan(id){
    return `deleting plan with ${id}`
}

/**
 * Updates plan with ID
 *
 * @param id
 * @param content
 * @returns {string}
 */
export function updatePlan(id, content){
    return `updating plan with ${id}`
}