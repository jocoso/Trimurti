const request = require('supertest');
const { app, server } = require('../server');



describe("Post API tests", () => {
    let savedPost;

    beforeAll(async () => {

        // Default post
        const postData = {
            title: "A Post",
            author: "Jocoso",
            content: "This is an existing post for testing."
        };

        const response = await request(app)
            .post('/api/post/')
            .send(postData);

        savedPost = response.body.data;

    });

    // TESTING GETTING ALL POSTS

    it("Should retrieve all posts", async () => {

        const response = await request(app)
            .get('/api/post/')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body.message).toBe('Posts successfully retrieved.');
        expect(Array.isArray(response.body.data)).toBeTruthy();

        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: savedPost.id
                })
            ])
        )

    });

    // TESTING GETTING A POST USING ITS ID


    it("Should retrieve a post by ID", async () => {

        const response = await request(app)
            .get(`/api/post/${savedPost.id}`)
            .expect(200)
            .expect('Content-Type', /json/);

        if (response.status !== 200)
            console.log(response.body);

        // Expectations
        expect(response.body.message).toBe("Post successfully retrieved.");
        expect(response.body.data).toHaveProperty('id', savedPost.id);

    });

    it("should update the post", async () => {
        const updateData = {
            title: "Update Title",
            content: "Updated content",
        };

        const response = await request(app)
            .put(`/api/post/${savedPost.id}`)
            .send(updateData)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body.message).toBe("Post updated successfully!");
    })
    afterAll(async () => {
        console.log(savedPost);
        await request(app)
            .delete(`/api/post/${savedPost.id}`)

        // Trying something out.
        // if (server) {
        //     server.close(done);
        // }

    }, 10000)
})

