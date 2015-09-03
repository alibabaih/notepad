<?php

        // set up the connection variables
//        $db_name  = 'application';
//        $hostname = 'localhost';
//        $username = 'root';
//        $password = 'root';

        // connect to the database
        $dbh = new PDO('mysql:host=localhost; dbname=notepad', 'root', 'root');

        // a query get all the records from the users table
        $sql = 'SELECT * FROM notes';

        // use prepared statements, even if not strictly required is good practice
        $stmt = $dbh->prepare( $sql );

        // execute the query
        $stmt->execute();

        // fetch the results into an array
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );

        // convert to json
        $json = json_encode( $result );

        // echo the json string
        echo $json;
?>