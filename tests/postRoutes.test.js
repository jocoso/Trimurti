// const request = require('supertest');
// const { app, server } = require('../server');
// const { User } = require('../models');



// describe("Post API tests", () => {

//     // TESTING POST CREATION
//     let savedPost;
//     let savedUser;

//     beforeAll(async () => {
//         try {
//             // Test data for user
//             const dummyUser = {
//                 username: 'auder',
//                 password: '12345'
//             }

//             // Adding user to database...
//             const userResponse = await request(app)
//                 .post('/api/user/')
//                 .send(dummyUser)
//                 .expect(200);


//             // User ready to use.
//             savedUser = userResponse.body.data;

//             if (!savedUser) throw new Error("This sucks");


//             // ==

//             // Test data for post
//             const dummyPost = {
//                 title: "A Post",
//                 content: "This is an existing post for testing.",
//                 author_id: savedUser.id
//             };

//             // Adding post to database...
//             const postResponse = await request(app)
//                 .post('/api/post/')
//                 .send(dummyPost)
//                 .expect(200);

//             savedPost = postResponse.body.data;

//         } catch (err) {

//             console.error('Error in beforeAll:', err);
//             throw err; // Re-throw error to ensure tests fail properly

//         }
//     }, 10000);

//     // TESTING GETTING ALL POSTS
//     test("should retrieve all posts.", async () => {

//         const response = await request(app)
//             .get('/api/post/')
//             .expect(200)
//             .expect('Content-Type', /json/);

//         expect(response.body.message).toBe('Posts successfully retrieved.');
//         expect(Array.isArray(response.body.data)).toBeTruthy();

//         expect(response.body.data).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     id: savedPost.id
//                 })
//             ])
//         )

//     });

//     // TESTING GETTING A POST USING ITS ID
//     test("Should retrieve a post by ID", async () => {

//         const response = await request(app)
//             .get(`/api/post/${savedPost.id}`)
//             .expect(200)
//             .expect('Content-Type', /json/);

//         // Expectations
//         expect(response.body.message).toBe("Post successfully retrieved.");
//         expect(response.body.data).toHaveProperty('id', savedPost.id);

//     });

//     it("should update the post", async () => {
//         const updateData = {
//             title: "Update Title",
//             content: "Updated content",
//         };

//         const response = await request(app)
//             .put(`/api/post/${savedPost.id}`)
//             .send(updateData)
//             .expect(200)
//             .expect('Content-Type', /json/);

//         expect(response.body.message).toBe("Post updated successfully!");
//     })

//     afterAll(async () => {

//         if (savedPost) {
//             await request(app)
//                 .delete(`/api/post/${savedPost.id}`)
//                 .expect(200);
//         } else {
//             console.warn('No post found for deletion');
//         }
    
//         if (savedUser) {
//             await request(app)
//                 .delete(`/api/user/${savedUser.id}`)
//                 .expect(200);
//         } else {
//             console.warn('No user found for deletion');
//         }
    
//         if (server) {
//             server.close();
//         }

//     });
// });

