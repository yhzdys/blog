var MotionExector = {
    queue: [],
    index: -1,
    add: function (fn) {
        this.queue.push(fn);
        return this;
    },
    next: function () {
        this.index++;
        let fn = this.queue[this.index];
        fn && fn(this);
    },
    start: function () {
        this.next();
    },
    clear: function () {
        jQuery.Velocity('stop');
        this.queue = [];
        this.index - 1;
    }
}

const Element_Class = {
    title: '.main-title',
    subTitle: '.subtitle',
    navItem: '.nav-item',
    post: '.post',
    tagYear: '.tag-year',
    tagNode: '.tag-archive-node',
    tagPostNode: '.tag-post-node',
    cloudTags: '.cloud-tag',
    logoLineBefore: '.logo-line-before i',
    logoLineAfter: '.logo-line-after i',
    page: 'div.page'
}

let logoLineMotion = function (MotionExector) {
    let before = document.querySelector(Element_Class.logoLineBefore);
    let after = document.querySelector(Element_Class.logoLineAfter);
    if (before && after) {
        let sequence = [];
        sequence.push({
            e: before,
            p: {
                translateX: '100%'
            },
            o: {
                duration: 200
            }
        })
        sequence.push({
            e: after,
            p: {
                translateX: '-100%'
            },
            o: {
                duration: 200,
                complete: function () {
                    MotionExector.next();
                }
            }
        })
        jQuery.Velocity.RunSequence(sequence);
    } else {
        MotionExector.next();
    }
}

let titleMotion = function (MotionExector) {
    let title = document.querySelector(Element_Class.title) || document.querySelector('.brand');
    let subTitle = document.querySelector(Element_Class.subTitle);

    let sequence = [];
    if (subTitle) {
        title && sequence.push({
            e: title,
            p: {
                opacity: 1,
                top: 0
            },
            o: {
                duration: 200
            }
        })
        sequence.push({
            e: subTitle,
            p: {
                opacity: 1,
                top: 0
            },
            o: {
                duration: 200,
                complete: function () {
                    MotionExector.next();
                }
            }
        })
    } else {
        title && sequence.push({
            e: title,
            p: {
                opacity: 1,
                top: 0
            },
            o: {
                duration: 200,
                complete: function () {
                    MotionExector.next();
                }
            }
        })
    }
    jQuery.Velocity.RunSequence(sequence);
}

let menuMotion = function (MotionExector) {
    let menus = document.querySelectorAll(Element_Class.navItem);

    menus && jQuery.Velocity(menus, 'transition.slideDownIn', {
        display: null,
        duration: 200,
        complete: function () {
            MotionExector.next();
        }
    })
}

let postListMotion = function (MotionExector) {
    let posts = document.querySelectorAll(Element_Class.post);
    let geminiSiteMeta = document.querySelector('.pisces .sidebar')
        || document.querySelector('.gemini .sidebar');

    if (geminiSiteMeta) {
        jQuery.Velocity(posts, 'transition.slideDownIn', {})
    } else {
        jQuery.Velocity(posts, 'transition.slideDownIn', {
            complete: function () {
                MotionExector.next();
            }
        })
    }

    let page = document.querySelector(Element_Class.page);
    if (page) {
        jQuery.Velocity(page, 'transition.slideDownIn', {})
    } else {
        jQuery.Velocity(page, 'transition.slideDownIn', {
            complete: function () {
                MotionExector.next();
            }
        })
    }

    geminiSiteMeta && jQuery.Velocity(geminiSiteMeta, 'transition.slideUpIn', {
        stagger: 100,
        drag: true,
        complete: function () {
            geminiSiteMeta.style.transform = '';
            MotionExector.next();
        }
    });

    if (posts.length <= 0 && !geminiSiteMeta) {
        MotionExector.next();
    }
}

let tagPostMotion = function (MotionExector) {
    let tagNodes = document.querySelectorAll(Element_Class.tagPostNode);

    if (tagNodes.length > 0) {
        jQuery.Velocity(tagNodes, 'transition.slideDownIn', {
            stagger: 100,
            drag: true,
            complete: function () {
                MotionExector.next();
            }
        });
    } else {
        MotionExector.next();
    }
}

let rightMenuMotion = function () {
    let museMenuBox = document.querySelector('#drawer_box'),
        postBody = document.querySelector('#post_body')
    if (museMenuBox && postBody && document.body.clientWidth > 765) {
        museMenuBox.click();
    }
}

MotionExector.add(logoLineMotion)
    .add(titleMotion)
    .add(menuMotion)
    .add(postListMotion)
    .add(tagPostMotion)
    .add(rightMenuMotion)
    .start();

window.addEventListener('load', function () {
    let sequence = [];
    let tagYears = document.querySelectorAll(Element_Class.tagYear);
    let tagNodes = document.querySelectorAll(Element_Class.tagNode);
    if (tagYears && tagYears.length) {
        sequence.push({
            e: tagYears,
            p: 'transition.slideLeftIn'
        });
    }
    if (tagNodes && tagNodes.length) {
        sequence.push({
            e: tagNodes,
            p: 'transition.slideDownIn'
        });
    }
    if (sequence.length > 0) {
        jQuery.Velocity.RunSequence(sequence);
    }
    let cloudTags = document.querySelectorAll(Element_Class.cloudTags)
    if (cloudTags && cloudTags.length > 0) {
        sequence = [];
        sequence.push({
            e: cloudTags,
            p: 'transition.expandIn'
        });
        jQuery.Velocity.RunSequence(sequence);
    }
})