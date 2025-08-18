import {useQuery, useInfiniteQuery , useMutation, useQueryClient} from '@tanstack/react-query';
import { fetchUsers, fetchRepos} from '../api/githubApi.jsx';


// Mock favorite mutation (simulates API delay)


const toggleFavourite = async(username) =>{
    return new Promise ((resolve)=> setTimeout(()=> resolve(username), 500));

};


// Hook for fetching user
export const useUserQuery  =(searchTerm) =>{
    return useQuery({
        queryKey: ['user', searchTerm],
        queryFn: ()=> fetchUsers(searchTerm),
        enabled: !!searchTerm,
    });
};

// Hook for fetching repos with pagination (infinite query)
export const  useReposInfiniteQuery  = (searchTerm, user) =>{
    return useInfiniteQuery({
        queryKey: ['repos', searchTerm],
        queryFn: ({pageParam = 1}) => fetchRepos({username:searchTerm, pageParam}),
        getNextPageParam: (lastPage, allPages)=> {
          // If last page has data, next page is current length + 1

          return lastPage.length >0 ?allPages.length+1 : undefined;
        },
        enabled:!!user,
    });
};



// Hook for favoriting mutation

export const useFavouriteMutation = (favourites, setFavourites) =>{

    const queryClient  = useQueryClient();

    return useMutation({
        mutationFn: toggleFavourite,
        onMutate: async(username) =>{
            const previousFavourites = favourites;
            setFavourites((prev)=>[...prev, username]);
            return {previousFavourites};
        },

        onError: (err, username, context)=> {
            if(context?.previousFavourites){
            setFavourites(context.previousFavourites);
            }
        },

        onSettled: () =>{
            queryClient.invalidateQueries({queryKey:['favourites']});
        },
    });

};

