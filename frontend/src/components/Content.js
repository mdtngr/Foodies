import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Grid from '@material-ui/core/Grid';

function Content() {
	const [ allPost, setAllPost ] = useState([]);

	useEffect(() => {
		const fetchAllPosts = () => {
			axios
				.get('http://localhost:3001/posts/allPostData')
				.then((res) => {
					setAllPost(res.data);
					console.log(res);
				})
				.catch((err) => {
					console.error(err);
				});
		};
		fetchAllPosts();
	}, []);

	function renderIt(post) {
		return (
			<Grid item md={3}>
				<PostCard
					key={post._id}
					date={post.uploadDate}
					imageUrl={post.url}
					imageTitle={post.title}
					description={post.description}
					title={post.title}
					author={post.author}
					social={post.social}
				/>
			</Grid>
		);
	}

	return (
		<div>
			<Grid container spacing={24}>
				{allPost.map((post, id) => renderIt(post))}
			</Grid>
		</div>
	);
}
export default Content;
