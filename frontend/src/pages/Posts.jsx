import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    IconButton
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Spinner from '../assets/animation_lkzzxw40_small.gif';
import axios from 'axios';
import EditPost from './EditPost';
import AddPost from './AddPost';
import { postD } from '../api/Api'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [active, setActive] = useState(1);
    const [loading, setLoading] = useState(true);
    const postsPerPage = 12;

    useEffect(() => {
        axios.get(postD)
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });
    }, []);

    const handleRemove = async (postId) => {
        try {
            await axios.delete(`${postD}/${postId}`);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const indexOfLastPost = active * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const limitedPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: active === index ? "blue" : "blue-gray",
        onClick: () => setActive(index),
    });

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };

    const next = () => {
        if (active === Math.ceil(posts.length / postsPerPage)) return;
        setActive(active + 1);
    };

    return (
        <div>
            <h1 className='md:text-6xl sm:text-5xl font-serif font-semibold text-center my-10 uppercase'>Posts</h1>
            <div className=' text-right lg:mr-5 sm:mx-auto my-5'>
                <AddPost />
            </div>
            <div className='flex flex-row flex-wrap gap-4 mx-5'>
                {loading ? (
                    <div className='flex flex-col justify-center'>
                        <img src={Spinner} alt="Loading" />
                    </div>
                ) : (
                    limitedPosts.map(post => (
                        <Card className="xl:w-[24.5%] lg:w-[32%] md:w-[48.5%] sm:w-[100%] my-6 shadow-2xl" key={post.id}>
                            <CardHeader color="blue-gray" className="relative h-auto">
                                <img
                                    src={post.image}
                                    alt="..."
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {post.title}
                                </Typography>
                                <Typography className="truncate hover:text-clip">
                                    {post.description}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0 flex">
                                <EditPost key={post.id} post={post} />
                                <Button onClick={() => handleRemove(post.id)} className='w-[50%] bg-red-400 shadow text-xs rounded outline-none focus:outline-none'>Delete</Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
            <div className="flex justify-center gap-4 my-10">
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                        <IconButton key={index + 1} {...getItemProps(index + 1)}>
                            {index + 1}
                        </IconButton>
                    ))}
                </div>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2"
                    onClick={next}
                    disabled={active === Math.ceil(posts.length / postsPerPage)}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default Posts;