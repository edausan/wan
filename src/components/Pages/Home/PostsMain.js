/* eslint-disable react-hooks/exhaustive-deps */
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FirebaseApp } from '../../../Firebase';
import { selectPost, setUserPosts } from '../../../redux/slices/postsSlice';
import { selectUsers } from '../../../redux/slices/usersSlice';
import PostLoading from './PostLoading';
// import { FixedSizeList as List } from "react-window";
// import InfiniteLoader from "react-window-infinite-loader";

// const LOADING = 1;
// const LOADED = 2;
// let itemStatusMap = {};

// const isItemLoaded = index => !!itemStatusMap[index];
// const loadMoreItems = (startIndex, stopIndex) => {
//   for (let index = startIndex; index <= stopIndex; index++) {
//     itemStatusMap[index] = LOADING;
//   }
//   return new Promise(resolve =>
//     setTimeout(() => {
//       for (let index = startIndex; index <= stopIndex; index++) {
//         itemStatusMap[index] = LOADED;
//       }
//       resolve();
//     }, 2500)
//   );
// };

const Post = React.lazy(() => import('./Post'));

const PostsMain = ({ profile }) => {
  const auth = getAuth(FirebaseApp);
  const dispatch = useDispatch();
  const { posts, userPosts } = useSelector(selectPost);
  const { currentUser } = useSelector(selectUsers);
  const params = useParams();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    // console.log({ userPosts, posts });
  }, [userPosts, posts]);

  useEffect(() => {
    if (profile && params?.id !== currentUser.user.uid) {
      const p = posts.filter((p) => p.post.uid === params?.id);
      console.log('OTHER POSTS', { other: p });
      setAllPosts(p);
    } else if (profile && params?.id === currentUser.user.uid) {
      console.log('USER POSTS', { userPosts });
      setAllPosts(userPosts);
    } else {
      const p = posts.filter((p) => p?.post?.uid === auth?.currentUser?.uid);
      dispatch(setUserPosts(p));
      setAllPosts(posts);
    }
  }, [params]);

  return (
    <>
      {/* <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={1000}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={150}
            itemCount={1000}
            itemSize={30}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={300}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader> */}
      <section
        className={`flex flex-col gap-3 mt-2 pb-[${
          profile ? '0' : '200px'
        }] w-full`}
      >
        {allPosts
          .slice()
          .sort(
            (a, b) =>
              new Date(b.post.date_created) - new Date(a.post.date_created)
          )
          .map((post) => {
            // console.log({ post });
            return (
              <Suspense key={post.id} fallback={<PostLoading />}>
                <Post post={post} />
              </Suspense>
            );
          })}
      </section>
    </>
  );
};

// class Row extends PureComponent {
//   render() {
//     const { index, style } = this.props;
//     let label;
//     if (itemStatusMap[index] === LOADED) {
//       label = `Row ${index}`;
//     } else {
//       label = "Loading...";
//     }
//     return (
//       <div className="ListItem" style={style}>
//         {label}
//       </div>
//     );
//   }
// }

export default React.memo(PostsMain);
