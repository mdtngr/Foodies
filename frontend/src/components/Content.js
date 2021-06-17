import React, {useEffect} from 'react';
import axios from 'axios';
import PostCard from './PostCard';


function Content() {

    useEffect(() => {
     const fetchAllPosts= () => {
  return axios.get('http://localhost:3001/posts/allPostData')
 .then((res) => {
    console.log(res['data']);    
    document.getElementById("contentDiv").insertAdjacentElement = plotPosts(res['data']);
  })
 .catch((err) => {
   console.error(err);
  });
}
fetchAllPosts();
    }, []);

    function plotPosts(allPosts){
        
        const postItems = allPosts.map( post => (
            <PostCard key={post._id}
             date="Date here"
              imageUrl= {post.url}
               imageTitle= {post.title}
                description={post.description} />
        ));

return postItems;
    }
   
    return (
        <div style={{padding: "10px"}} id="contentDiv" >
            
        </div>
    )
}

export default Content
