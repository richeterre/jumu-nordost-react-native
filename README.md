Jumu Nordost for Android
========================

This is a companion app for participants and audiences of the ["Jugend musiziert"][jugend-musiziert] music competition. It shows all available schedules and programmes for contests held at German schools abroad within the "Nord- und Osteuropa" competition region.

[jugend-musiziert]: https://en.wikipedia.org/wiki/Jugend_musiziert

Tech Specs
----------

The app supports Android 4.1 ("Jelly Bean") and above, and is implemented using Facebook's [React Native][react-native] framework. Don't look for great architecture or code quality here, as the app was built under tight time constraints and published after just 13 hours of work :sunglasses:

There is also an open-source, natively built [iOS version][jumu-nordost-ios] that served as the model for this app.

[react-native]: https://facebook.github.io/react-native/
[jumu-nordost-ios]: https://github.com/richeterre/jumu-nordost-ios

Features
--------

* [x] List contests
* [x] Browse performances in contest by day and venue
* [x] See performance details, such as participants and pieces

Setup
-----

The project doesn't compile until you have provided a credentials file. Do as follows:

1. Fire up your favorite text editor and create a file named `secrets.js` in the project root.
1. Enter the following:

    ```javascript
    export default {
      apiKey: '<INSERT API KEY HERE>',
    }
    ```

1. Insert the API key for the server you're developing against.

Acknowledgements
----------------

This project is kindly sponsored by [Futurice][futurice] as part of their fantastic [open-source program][spice-program]. Kiitos!

[futurice]: http://futurice.com/
[spice-program]: http://www.spiceprogram.org/
