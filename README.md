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
    

6. Web Audio API

  When using Web Audio API, there are three steps
    6.1 Make sure the browser can run the API, if it works then the context will be created.
    6.2 Produce sound buffer from outside audio source(mp3, wav,...) then convert it into sound buffer
    6.3 Make a function for playing sound with created buffer. 
       6.3.1 create source buffer
       6.3.2 create filters, gains,... (optional)
       6.3.3 create destination object
       6.3.4 connect all together in order.
       
7. Web API 
    
    7.1 Access MIDI
        7.1.1 requestMIDIAccess
        7.1.2 onMIDISuccess and onMIDIFailure
    7.2 FileReader Object - convert blob into arrayBuffer which can be read in audio API
    7.3 Blob object - produce blob with 
    7.4 mediaRecorder - 
    7.5 formData- pass binary data

8. npm
    
    8.1 express
    8.2 bodyPaser
    8.3 mongoose
    8.4 pg
    8.5 multer
        