# McRaeathon Layouts

> The on-screen graphics used during McRaeathon's speedrun events.

This is a [NodeCG](http://github.com/nodecg/nodecg) v2.0.0 bundle. You will need to have NodeCG v2.0.0 or above installed to run it. It also requires you to install the [nodecg-speedcontrol](https://github.com/speedcontrol/nodecg-speedcontrol) bundle (of which you may also need to install the latest changes instead of the most stable release).

## Installation

You will need [Node.js](https://nodejs.org) (22.x LTS tested) and [git](https://git-scm.com/) installed to install NodeCG, then see the [NodeCG documentation](https://www.nodecg.dev/docs/installing) on how to install that. I also suggest installing `nodecg-cli`; information on that is also on the documentation just linked. You may also need to install the appropriate build tools for whichever platform you are running on; for example if you are on Windows you can either install it while installing Node.js, or using [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools).

Next, clone the `build` branch of this repository into the NodeCG `bundles` folder and install the dependencies:
> ```
> cd bundles
> git clone https://github.com/KinzyKenzie/mcrae-layouts.git
> ```

You will probably also want a default configuration you can fill in, which can be created using:
> ```
> cd mcrae-layouts
> nodecg defaultconfig
> ```

Then, to get the most recent changes for [nodecg-speedcontrol](https://github.com/speedcontrol/nodecg-speedcontrol), clone the `build` branch and install dependencies, similar to above:
> ```
> cd ..
> git clone https://github.com/speedcontrol/nodecg-speedcontrol.git --branch build
> cd nodecg-speedcontrol
> npm install --production
> ```

## Events

Here's a list of events this bundle has been used at so far:
* [McRaeathon Presents: A Blast from the Past 2000!](https://oengus.io/marathon/McRaeBFTP2)

## Credits

* Uses [nodecg-speedcontrol](https://github.com/speedcontrol/nodecg-speedcontrol).
* With sections inspired directly by [uksg-layouts](https://github.com/uksgmarathon/uksg-layouts).
* Made possible with help from:
    * [zolaa](https://speedrun.com/users/zolaa)
    * [zoton2](https://github.com/zoton2)
    * [inkfarer](https://github.com/inkfarer)
* Fonts used:
    * [Aero Matics](https://tilde.club/~harvettfox96/l/) by Jayvee Enaguas.
    * [Enigmatic](https://dartcanada.tripod.com/Objets/New/new.html) by Darren Rigby.
* Credits text shamelessly copied from [esa-layouts](https://github.com/esamarathon/esa-layouts).
