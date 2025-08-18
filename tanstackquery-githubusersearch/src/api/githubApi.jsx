import axios from 'axios';


//Fetch user data
export const fetchUsers = async (username)=> {
    const { data } = await axios.get(`https://api.github.com/users/${username}`);
    return data;
};


//fetch user repositories with pagination
export const fetchRepos =async ({username, pageParam = 1}) =>{
    const perPage =10;  //10 repos per page


    const { data }  = await axios.get(`https://api.github.com/users/${username}/repos`,
        {params: { page: pageParam, per_page: perPage}}
    );

return data;

}