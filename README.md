Music Production

1. psql

    1.1 start psql
        $ sudo service postgresql start
    1.2 node-postgre

2. strat web server 
    $ node app.js 

3. initial route 

    3.1 /user/sign_up : user sign up page
        if success: redirect to /user/log_in 
        if fail: stay in /user/sign_up

    3.2 /user/log_in : user log in page
        if success: redirect to /user_:user/projects
        if fail: stay in /user/log_in
        
    3.3 /user_:user/projects: user's all project
    3.4 /user:_user/projects_:project/tracks : user's all tracks in a project  
    3.5 /user:_user/projects_:project/tracks_:track: user's music studio (a track)

4. psql CRUD structure
    The route is based on RESTful principle.     

    4.1 create
        4.1.1 route setting: POST (~/something) 
        4.1.2 ejs: using form to pass parameters.
    4.2 Read 
        4.2.1 route setting: GET (~/something)
        4.2.2 using a tag or redirect to given page after submitting a form. 
    4.3 Update
        4.3.1 route setting: POST (~/something_:something) 
        4.3.2 ejs: using form to pass parameters.
    4.4 Delete
        4.4.1 route setting: Delete (~/something_:something) 
        4.4.2 ejs: using parameters from app.js(route set).
        4.4.3 ajax: using ajax to a new direction. 
        
5. mongo db
    store data under workspace
    
    1.1 run mongo: $ ./mongod
    1.2 