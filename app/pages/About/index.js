import { Expo, TimelineMax } from 'gsap'
import { each, map } from 'lodash'

import Page from '../../classes/Page'

import { split, calculate } from '../../utils/text'

import styles from './styles.scss'

export default class extends Page {
  constructor () {
    super({
      element: 'section',
      name: 'About',
      url: '/about'
    })

    const socials = [
      {
        label: 'Email',
        url: 'mailto:hello@lhbzr.com'
      },
      {
        label: 'GitHub',
        url: 'https://www.github.com/lhbzr/'
      },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/lhbzr/'
      },
      {
        label: 'Tumblr',
        url: 'http://lhbzr.tumblr.com/'
      },
      {
        label: 'Twitter',
        url: 'https://www.twitter.com/lhbzr/'
      }
    ]

    this.element.className = `About ${styles.about}`
    this.element.innerHTML = `
      <div class="Wrapper ${styles.wrapper}">
        <h1 class="Title ${styles.title}">
          Hey, I'm Bizarro.
        </h1>

        <p class="Description ${styles.description}">
          I'm a 23 y/o Front End Developer and WebGL Developer based in São Paulo, Brazil. I'm currently working remotely with Creative Development at UNIT9 — Ad Age 2019 Production Company of the Year.
        </p>

        <p class="Description ${styles.description}">
          I'm also a Young Jury member of Awwwards and previously I was a Volunteer Editor for Tumblr #Gaming tag until featured tags were discontinued.
        </p>

        <p class="Description ${styles.description}">
          My main expertise is developing apps, games and websites using JavaScript and WebGL.
          My current favorite frameworks, libraries and tools are GreenSock, Lottie, Phaser, Pixi.js, React, React Native, Redux and Three.js.
        </p>

        <p class="Description ${styles.description}">
          <strong>I'm available for freelance work.</strong>
        </p>

        <div class="Social ${styles.social}">
          <span class="${styles.social__title}">Get In Touch:</span>

          <ul class="${styles.social__list}">
            ${map(socials, social => `
              <li class="${styles.social__item}">
                <a href="${social.url}" class="${styles.social__link}" target="_blank">
                  ${social.label}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `.replace(/ {2}/g, '')

    this.elements = {
      title: this.element.querySelector('.Title'),
      description: this.element.querySelectorAll('.Description'),
      descriptionSpans: [],
      social: this.element.querySelector('.Social')
    }

    this.setup()
  }

  setup () {
    each(this.elements.description, description => {
      const group = split({
        element: description,
        expression: ' '
      })

      group.forEach(element => {
        this.elements.descriptionSpans.push(element)
      })
    })
  }

  show () {
    const timeline = new TimelineMax()

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const { descriptionSpans, social, title } = this.elements

        const ease = Expo.easeOut
        const spans = calculate(descriptionSpans)

        timeline.set(this.element, {
          autoAlpha: 1
        })

        timeline.fromTo(title, 1.5, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          ease,
          y: 0
        })

        timeline.staggerFromTo(spans, 1.5, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          ease,
          y: 0
        }, 0.05, '-= 1.45')

        timeline.fromTo(social, 1.5, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          ease,
          y: 0
        }, '-= 1.45')
      })
    })

    return super.show(timeline)
  }

  hide () {
    const { descriptionSpans, social, title } = this.elements

    const timeline = new TimelineMax()

    const ease = Expo.easeOut
    const spans = calculate(descriptionSpans)

    timeline.to(title, 0.6, {
      autoAlpha: 0,
      ease,
      y: -50
    })

    timeline.staggerTo(spans, 0.6, {
      autoAlpha: 0,
      ease,
      y: -50
    }, 0.05, '-= 0.5')

    timeline.to(social, 0.6, {
      autoAlpha: 0,
      ease,
      y: -50
    }, '-= 0.5')

    timeline.set(this.element, {
      autoAlpha: 0
    })

    return super.hide(timeline)
  }
}