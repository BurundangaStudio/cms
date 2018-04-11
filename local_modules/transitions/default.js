//
// transitions/default.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

module.exports = {

    name: 'default',
    css: false,
    mode: 'out-in',
    appear: true,


    //
    // LEAVE TRANSITION

    beforeLeave(el) {

        // console.log('Default transition BEFORE LEAVE')
    },
    leaveCancelled(el) {

        // console.log('Default transition LEAVE CANCELLED')
    },
    leave(el, done) {

        done()
        // console.log('Default transition LEAVE')
    },
    afterLeave(el) {

        // console.log('Default transition AFTER LEAVE')
    },


    //
    // ENTER TRANSITION

    beforeEnter(el) {

        // console.log('Default transition BEFORE CANCELLED')
    },
    enterCancelled(el) {

        // console.log('Default transition ENTER CANCELLED')
    },
    enter(el, done) {

        done()
        // console.log('Default transition ENTER')
    },
    afterEnter(el) {

        // console.log('Default transition AFTER ENTER')
    }

}
