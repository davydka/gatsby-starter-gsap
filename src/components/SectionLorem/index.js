import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
// import faker from 'faker'

import styles from './SectionLorem.module.scss'

const cx = classnames.bind(styles)

const SectionLorem = ({ className, showBorders }) => {
  return (
    <div className={`section-container ${cx(className, { borders: showBorders })}`}>
      <div className={`section`}>
        <div className={`row`}>
          <div className={`col`}>
            <div className={cx('content-container')}>
              <p>
                so you find yourself at the zoo
                <br />
                the snake house to be exact
                <br />
                the day is hotter than hell
                <br />
                you go to the zoo with the others
                <br />
                for recreation or whatever
                <br />
                except you&apos;re the only one alone
                <br />
                which is already a signal as
                <br />
                everyone else has a family
                <br />
                yapping along, sucking down frozen lemonade
                <br />
                and there you are thinking
                <br />
                i don&apos;t even care about any of these animals
                <br />
                i don&apos;t even know if they are real- you know
                <br />
                because this zoo feels like one big show
                <br />
                and probably probably they have a bunch of actors backstage
                <br />
                dressing up as tigers and zebras or whatever
                <br />
                just so these morons will oooh and aaah
                <br />
                to suck down more pretzel bites and lemonade
                <br />
                <br />
                it makes me really mad
                <br />
                i came to the zoo to relax but i can&apos;t relax
                <br />
                i&apos;m supposed to be having fun
                <br />
                <br />
                then you go to the snake house
                <br />
                and that&apos;s when it happens
                <br />
                this one snake takes control of your mind
                <br />
                <br />
                and no i&apos;m not crazy
                <br />
                i don&apos;t hear voices or see things
                <br />
                <br />
                but this snake already has a plan for me
                <br />
                soon as he sees me
                <br />
                <br />
                You gotta get me outta here Boss
                <br />
                <br />
                What are you saying?
                <br />
                stop that
                <br />
                you look around
                <br />
                there&apos;s nobody else in the snake house
                <br />
                <br />
                You gotta get me outta here
                <br />
                <br />
                well that&apos;s not right snake and
                <br />
                get out of my head Ok
                <br />
                i came here to look at you
                <br />
                not have a conversation
                <br />
                <br />
                you look around
                <br />
                <br />
                none of these other snakes seem to care
                <br />
                <br />
                all fattened up on gerbils & reptile sedatives
                <br />
                don&apos;t any of you notice what&apos;s happening here
                <br />
                because let&apos;s face it
                <br />
                it is a conspiracy of sorts
                <br />
                the snake fixes his gaze on you
                <br />
                <br />
                I need a name Boss and you&apos;re gonna help me get one
                <br />
                <br />
                the snake lays out a plan
                <br />
                you need to get one of those dumb safari outfits
                <br />
                to look like a zoo employee
                <br />
                why do they dress like that
                <br />
                and you will come back at feeding time
                <br />
                slip in behind the other employees
                <br />
                <br />
                you pull the safari hat low on your skull
                <br />
                and you sneak inside
                <br />
                <br />
                you open the the aquarium
                <br />
                the snake looks up at you
                <br />
                Good Good
                <br />
                now hurry the fuck up
                <br />
                put me in the bag
                <br />
                before the others return
                <br />
                <br />
                but one of the employees sees you
                <br />
                Hey What are You Doing?
                <br />
                The snake yells
                <br />
                hit the bastard- knock him down
                <br />
                and you do
                <br />
                the snake has fully taken control of your mind
                <br />
                the employee falls to the ground and
                <br />
                you drop the snake into your backpack and start to run
                <br />
                <br />
                outside the snake commands you
                <br />
                <br />
                Slow down, don&apos;t run
                <br />
                act casual
                <br />
                <br />
                you dispose of the safari uniform in the bathroom
                <br />
                walk calmly back to the car
                <br />
                <br />
                you and the snake drive for days
                <br />
                he won&apos;t let you stop
                <br />
                except for bathroom breaks
                <br />
                gas and drive thru snacks
                <br />
                <br />
                where are we going anyway
                <br />
                <br />
                Relax Buddy, I got this covered
                <br />
                remember I selected you
                <br />
                you should take comfort in that fact
                <br />
                you should feel proud not scared
                <br />
                <br />
                <br />
                the detective smiles at you
                <br />
                so basically it&apos;s the snake&apos;s fault
                <br />
                <br />
                yeah exactly
                <br />
                <br />
                but you&apos;re the detective
                <br />
                and you represent the LAW
                <br />
                i should be grateful , not afraid
                <br />
                where would we be without the law
                <br />
                in the wild like animals
                <br />
                the law emerged over lifetimes
                <br />
                to show us the way
                <br />
                & you are the long arm of the law
                <br />
                okay your arms aren&apos;t that long
                <br />
                but still your reach is vaassst
                <br />
                crossing borders to set us right
                <br />
                <br />
                i want to make a perfect gesture
                <br />
                a lawful gesture
                <br />
                to demonstrate my agreement
                <br />
                <br />
                never shall we risk rebellion again
                <br />
                rebellion is for the sick
                <br />
                children with no appreciation for history
                <br />
                no sense of obedience
                <br />
                they say they want wildness
                <br />
                but then they cry out in terror
                <br />
                <br />
                here&apos;s the deal
                <br />
                you can&apos;t walk 2 steps without falling over lies
                <br />
                these talkers
                <br />
                professional talkers i call em
                <br />
                i made myself learn to speak
                <br />
                to drown out the noise
                <br />
                you&apos;re a detective right
                <br />
                you represent the law and a special order
                <br />
                <br />
                my job is surveilance
                <br />
                <br />
                you don&apos;t say?
                <br />
                let me tell you something mr. detective
                <br />
                LONG before any people
                <br />
                there was a garden
                <br />
                a place of virtue
                <br />
                actually virtue wasn&apos;t even invented
                <br />
                there was no need
                <br />
                the animals just hung out minding their own business
                <br />
                but then these talkers moved in
                <br />
                the first couple of talkers
                <br />
                discussing the future all night
                <br />
                making up stories
                <br />
                they couldn&apos;t shut up
                <br />
                the animals were like jesus ( though he wasn&apos;t invented either)
                <br />
                the animals nominated the snake
                <br />
                they said you are good at talking
                <br />
                get these talkers to shut up
                <br />
                and the snake slid out before them to request silence
                <br />
                BUT THEN somehow it&apos;s the snake&apos;s fault they ate from the tree
                <br />
                and got up to no good?
                <br />
                it&apos;s the snake&apos;s fault- how is that?
                <br />
                obviously the snake was selected as The Fall Guy
                <br />
                and it was decreed that the snake shall crawl on its belly
                <br />
                eating the dust as punsihment, yada yada yada
                <br />
                but okay i get it
                <br />
                we need the law because without the law
                <br />
                there would be no limits
                <br />
                ooh scary
                <br />
                a map is a territory so you know where you live
                <br />
                and how to get home
                <br />
                if you wander too far into the margins
                <br />
                that&apos;s it
                <br />
                you&apos;re done for am i right?
                <br />
                you may never make it back right?
                <br />
                <br />
                im telling you this story makes little to no sense
                <br />
                everybody blames the snake
                <br />
                for them eating the apple
                <br />
                which we know is horseshit
                <br />
                the snake was just following orders
                <br />
                <br />
                <br />
                <br />
                detective: Laws have to do with property. that snake didn&apos;t belong to you
                <br />
                <br />
                it didn&apos;t belong to the zoo either!
                <br />
                they bought it from somebody who stole it from where it used to live
                <br />
                <br />
                SO finally
                <br />
                after driving for days
                <br />
                the snake announces we are almost there
                <br />
                to our destination
                <br />
                he says we can stop and sit down to eat at this diner
                <br />
                i couldn&apos;t believe it
                <br />
                and you know what?
                <br />
                this snake just slides right into the diner
                <br />
                nobody seemed to bat an eye
                <br />
                we sit down in the booth and he orders hisself a giant pancake breakfast
                <br />
                eats with gusto
                <br />
                the waitress is so impressed, she refilled his water glass like 7 times
                <br />
                and she said ALL DONE HON?
                <br />
                No im not hissed the snake and the blood ran out of her face
                <br />
                she backed away
                <br />
                as if it was the first time she noticed that he was actaually a snake
                <br />
                because people simply notice whatever it is that they want to notice
                <br />
                <br />
                who are we going to see
                <br />
                I asked the snake
                <br />
                you&apos;ll ssssssseeee
                <br />
                he hissed
                <br />
                <br />
                <br />
                <br />
                im thinking that one aspect of this story was the poison
                <br />
                they call it snake Juice
                <br />
                <br />
                we drove for days
                <br />
                the snake wouldn&apos;t say a word
                <br />
                we were so far out my phone couldn&apos;t get a signal
                <br />
                the sky was vast & full of stars
                <br />
                like the damn sky was gonna fall on us
                <br />
                where are we going snake?
                <br />
                but the snake didn&apos;t answer
                <br />
                and then the snake began to recite all of the constellations
                <br />
                <br />
                Perseus, Pegasus, Hydra, Orion, Canis Major, Canis Minor, Lepus, Monoceros, Aries, Taurus, Gemini,
                Cancer, Leo, Virgo, Libra, Scorpius, Sagittarius, Capricornus, Aquarius, Pisces
                <br />
                <br />
                damn i never realized that most of these stars were named after animals which makes zero sense when you
                think about it unless all of us animals fell from the sky which is actually true.
                <br />
                i never learned to read the sky.
                <br />
                the snake continued to surprise
                <br />
                <br />
                finally we came to a stop.
                <br />
                <br />
                in the middle of nowhere there was a trailer
                <br />
                and in this trailer was the Washed Up Rocker
                <br />
                the Washed Up Rocker looked 30 years older than he was
                <br />
                his hair was still jet black
                <br />
                he hadn&apos;t touched his guitar in years
                <br />
                <br />
                the snake said Hello Rocker!
                <br />
                and the rocker froze
                <br />
                <br />
                he bit the rocker and stole his body and that was it
                <br />
                the snake stole the Washed Up Rockers Body
                <br />
                <br />
                and just like that the poison enters your bloodstream
                <br />
                shakes you loose
                <br />
                you can play music again
                <br />
                <br />
                it&apos;s true i haven&apos;t played for years
                <br />
                <br />
                <br />
                <br />
                <br />
                he&apos;s already delirious
                <br />
                the snake juice is taking him over. the snake watches carefullly
                <br />
                <br />
                What&apos;s the meaning of Rock N Roll?
                <br />
                <br />
                I don&apos;t know sez the snake_ you tell me
                <br />
                <br />
                Rocker:
                <br />
                The meaning of rock n Roll is losing your mind
                <br />
                when I would play in those giant stadiums
                <br />
                when i was super famous
                <br />
                I was connected to everybody
                <br />
                15 yr olds 20 yr olds 70 yr olds
                <br />
                everybody
                <br />
                they all lost their minds too
                <br />
                it was like having sex
                <br />
                with everybody at the same time
                <br />
                <br />
                that&apos;s kind of nasty- observed the snake
                <br />
                <br />
                sure it&apos;s nasty, but don&apos;t knock it till you&apos;ve tried it
                <br />
                <br />
                What happened?
                <br />
                <br />
                Evil
                <br />
                classic story
                <br />
                I got betrayed by the record company
                <br />
                because I wouldn&apos;t play ball.
                <br />
                <br />
                and the washed up rocker remembered his hit single
                <br />
                <br />
                wadda ya got to lose
                <br />
                wadda ya got to lose
                <br />
                we may be
                <br />
                eventually
                <br />
                wearin somebody else&apos;s shoes
                <br />
                <br />
                you can think and see and move
                <br />
                the brain folds
                <br />
                you are perfect now and you know what to do
                <br />
                <br />
                this poison is your blood
                <br />
                this poison is the message we crave
                <br />
                <br />
                it happens when he begins talking to himself
                <br />
                this is not act of willpower
                <br />
                like all else it just dropped from the sky
                <br />
                <br />
                then we come up this trailer
                <br />
                who goes there?
                <br />
                tis I the Washed Up Rocker
                <br />
                and it was
                <br />
                rumor has it
                <br />
                the rocker hadn&apos;t touched his guitar in over 20 years
                <br />
                he looked 30 years older
                <br />
                but his hair was still jet black
                <br />
                <br />
                im the washed up rocker okay
                <br />
                why was this snake so determined to find this character?
                <br />
                <br />
                some kind of trance was happening
                <br />
                where the snake was entering the body of the rocker
                <br />
                <br />
                then the snake sez
                <br />
                don&apos;t worry rocker
                <br />
                we can change your circumstances
                <br />
                but i need your body
                <br />
                the rocker gasped:
                <br />
                it&apos;s my body bro
                <br />
                of course it is
                <br />
                i just need to borrow it for a few days
                <br />
                and then everything goes back
                <br />
                better than ever
                <br />
                just like your song rocker:
                <br />
                waddya got to lose?
                <br />
                <br />
                <br />
                <br />
                anyway the washed up rocker talking to himself
                <br />
                <br />
                the snake explains , im gonna need to be taking over your body
                <br />
                <br />
                why?
                <br />
                <br />
                because I need a name
                <br />
                <br />
                why you gotta steal my body to get a name?
                <br />
                <br />
                sorry
                <br />
                <br />
                people have snakes with names. i had a snake once
                <br />
                <br />
                im not a pet- you don&apos;t understand
                <br />
                <br />
                names cause problems
                <br />
                you see that guitar/ as soon as i named that guitar
                <br />
                i couldn&apos;t play it anymore
                <br />
                <br />
                that&apos;s stupid
                <br />
                <br />
                yeah well may be but that&apos;s what happend
                <br />
                it&apos;s like the guitar became bigger than me
                <br />
                i used to name all of my guitars and then i realized this is bullshit
                <br />
                this is so stupid they&apos;re just hunks of wood and metal strung together
                <br />
                you know that one time CHarlie Parker pawned his saxophone for heroin
                <br />
                and then all he had to play was a toy saxophone
                <br />
                i decided i was only gonna play toy guitars anymore
                <br />
                because these guitars with names are bulshit
                <br />
                <br />
                the washed up rocker fell over and died.
                <br />
                <br />
                the snake took over his body
                <br />
                it was completely weird/
                <br />
                the snakes body disappeared and then the rocker woke up again
                <br />
                but his eyes were the snakes eyes.
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SectionLorem.propTypes = {
  className: PropTypes.string,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(SectionLorem)
