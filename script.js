/* =========================================================
   DRAKES CODE & DESIGN
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   ALWAYS START THE PAGE AT THE TOP
========================================================= */

/*
   Prevents the browser from automatically restoring the
   visitor's previous scroll position after a refresh.
*/
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

const resetPageToTop = () => {
    const documentElement = document.documentElement;
    const pageBody = document.body;

    const previousScrollBehavior =
        documentElement.style.scrollBehavior;

    /*
       Temporarily disable smooth scrolling so the page
       immediately moves to the top.
    */
    documentElement.style.scrollBehavior = "auto";

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });

    documentElement.scrollTop = 0;

    if (pageBody) {
        pageBody.scrollTop = 0;
    }

    window.requestAnimationFrame(() => {
        documentElement.style.scrollBehavior =
            previousScrollBehavior;
    });
};

/*
   Remove any section hash left in the URL after a refresh.
   Example: drakescode.com/#pricing becomes drakescode.com/
*/
const clearPageHash = () => {
    if (!window.location.hash) {
        return;
    }

    const cleanUrl =
        window.location.pathname +
        window.location.search;

    history.replaceState(
        null,
        "",
        cleanUrl
    );
};

clearPageHash();

window.addEventListener("load", () => {
    resetPageToTop();

    /*
       A second reset handles browsers that try to restore
       their saved scroll position after the load event.
    */
    window.requestAnimationFrame(
        resetPageToTop
    );

    window.setTimeout(
        resetPageToTop,
        50
    );
});

window.addEventListener("pageshow", () => {
    clearPageHash();
    resetPageToTop();

    window.requestAnimationFrame(
        resetPageToTop
    );
});


document.addEventListener("DOMContentLoaded", () => {
    resetPageToTop();


    /* =====================================================
       1. ELEMENT REFERENCES
    ====================================================== */

    const body = document.body;

    const header =
        document.getElementById("site-header");

    const mobileMenuButton =
        document.getElementById(
            "mobile-menu-button"
        );

    const mobileNavigation =
        document.getElementById(
            "mobile-navigation"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".desktop-navigation a, " +
            ".mobile-navigation a"
        );

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );

    const processSteps =
        document.querySelectorAll(
            ".process-step"
        );

    const pricingSelectButtons =
        document.querySelectorAll(
            ".pricing-select-button"
        );

    const contactSection =
        document.getElementById("contact");

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    const formStatus =
        document.getElementById(
            "form-status"
        );

    const projectTypeField =
        document.getElementById(
            "project-type"
        );

    const budgetField =
        document.getElementById(
            "budget"
        );

    const messageField =
        document.getElementById(
            "message"
        );

    const currentYear =
        document.getElementById(
            "current-year"
        );

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );

    const browserWindow =
        document.querySelector(
            ".browser-window"
        );

    const customCursor =
        document.querySelector(
            ".custom-cursor"
        );

    const customCursorDot =
        document.querySelector(
            ".custom-cursor-dot"
        );

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    const desktopPointer =
        window.matchMedia(
            "(min-width: 961px) and " +
            "(hover: hover) and " +
            "(pointer: fine)"
        );

    const mobileViewport =
        window.matchMedia(
            "(max-width: 960px)"
        );


    /* =====================================================
       2. HELPER FUNCTIONS
    ====================================================== */

    const debounce = (
        callback,
        delay = 150
    ) => {
        let timeoutId;

        return (...args) => {
            window.clearTimeout(
                timeoutId
            );

            timeoutId =
                window.setTimeout(() => {
                    callback(...args);
                }, delay);
        };
    };

    const getHeaderHeight = () => {
        if (!header) {
            return 0;
        }

        return header
            .getBoundingClientRect()
            .height;
    };

    const scrollToElement = (
        element,
        additionalOffset = 0
    ) => {
        if (!element) {
            return;
        }

        const headerHeight =
            getHeaderHeight();

        const targetPosition =
            element
                .getBoundingClientRect()
                .top +
            window.scrollY -
            headerHeight -
            additionalOffset;

        window.scrollTo({
            top: Math.max(
                targetPosition,
                0
            ),

            behavior:
                prefersReducedMotion.matches
                    ? "auto"
                    : "smooth"
        });
    };


    /* =====================================================
       3. CURRENT YEAR
    ====================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       4. STICKY HEADER
    ====================================================== */

    const updateHeader = () => {
        if (!header) {
            return;
        }

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =====================================================
       5. MOBILE NAVIGATION
    ====================================================== */

    let previouslyFocusedElement = null;

    const getMobileMenuFocusableElements =
        () => {
            if (!mobileNavigation) {
                return [];
            }

            return Array.from(
                mobileNavigation
                    .querySelectorAll(
                        'a[href], ' +
                        'button:not([disabled]), ' +
                        'input:not([disabled]), ' +
                        'select:not([disabled]), ' +
                        'textarea:not([disabled]), ' +
                        '[tabindex]:not([tabindex="-1"])'
                    )
            );
        };

    const openMobileMenu = () => {
        if (
            !mobileMenuButton ||
            !mobileNavigation
        ) {
            return;
        }

        previouslyFocusedElement =
            document.activeElement;

        body.classList.add(
            "menu-open"
        );

        mobileMenuButton.classList.add(
            "active"
        );

        mobileNavigation.classList.add(
            "open"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        const firstFocusableElement =
            getMobileMenuFocusableElements()[0];

        window.setTimeout(() => {
            firstFocusableElement?.focus();
        }, 100);
    };

    const closeMobileMenu = ({
        restoreFocus = false
    } = {}) => {
        if (
            !mobileMenuButton ||
            !mobileNavigation
        ) {
            return;
        }

        body.classList.remove(
            "menu-open"
        );

        mobileMenuButton.classList.remove(
            "active"
        );

        mobileNavigation.classList.remove(
            "open"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        if (
            restoreFocus &&
            previouslyFocusedElement
                instanceof HTMLElement
        ) {
            previouslyFocusedElement.focus();
        }

        previouslyFocusedElement = null;
    };

    const toggleMobileMenu = () => {
        const menuIsOpen =
            body.classList.contains(
                "menu-open"
            );

        if (menuIsOpen) {
            closeMobileMenu({
                restoreFocus: true
            });
        } else {
            openMobileMenu();
        }
    };

    mobileMenuButton?.addEventListener(
        "click",
        toggleMobileMenu
    );

    mobileNavigation
        ?.querySelectorAll("a")
        .forEach((link) => {
            link.addEventListener(
                "click",
                () => {
                    closeMobileMenu();
                }
            );
        });

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                body.classList.contains(
                    "menu-open"
                )
            ) {
                closeMobileMenu({
                    restoreFocus: true
                });

                return;
            }

            if (
                event.key !== "Tab" ||
                !body.classList.contains(
                    "menu-open"
                )
            ) {
                return;
            }

            const focusableElements =
                getMobileMenuFocusableElements();

            if (!focusableElements.length) {
                return;
            }

            const firstElement =
                focusableElements[0];

            const lastElement =
                focusableElements[
                    focusableElements.length - 1
                ];

            if (
                event.shiftKey &&
                document.activeElement ===
                    firstElement
            ) {
                event.preventDefault();
                lastElement.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement ===
                    lastElement
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    );

    document.addEventListener(
        "click",
        (event) => {
            if (
                !body.classList.contains(
                    "menu-open"
                ) ||
                !header
            ) {
                return;
            }

            if (
                !header.contains(
                    event.target
                )
            ) {
                closeMobileMenu();
            }
        }
    );

    const resetMobileMenuOnResize =
        debounce(() => {
            if (!mobileViewport.matches) {
                closeMobileMenu();
            }
        });

    window.addEventListener(
        "resize",
        resetMobileMenuOnResize
    );

    window.addEventListener(
        "orientationchange",
        () => {
            closeMobileMenu();
        }
    );


    /* =====================================================
       6. SMOOTH INTERNAL LINKS
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {
            link.addEventListener(
                "click",
                (event) => {
                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    let targetElement;

                    try {
                        targetElement =
                            document.querySelector(
                                targetId
                            );
                    } catch {
                        return;
                    }

                    if (!targetElement) {
                        return;
                    }

                    event.preventDefault();

                    closeMobileMenu();

                    scrollToElement(
                        targetElement,
                        12
                    );

                    if (
                        history.pushState &&
                        targetId !== "#home"
                    ) {
                        history.pushState(
                            null,
                            "",
                            targetId
                        );
                    } else if (
                        history.replaceState &&
                        targetId === "#home"
                    ) {
                        history.replaceState(
                            null,
                            "",
                            window.location.pathname +
                            window.location.search
                        );
                    }
                }
            );
        });


    /* =====================================================
       7. ACTIVE NAVIGATION LINK
    ====================================================== */

    const observedSections = [
        "home",
        "services",
        "projects",
        "process",
        "pricing",
        "about",
        "contact"
    ]
        .map((sectionId) => {
            return document.getElementById(
                sectionId
            );
        })
        .filter(Boolean);

    const updateActiveNavigation =
        (sectionId) => {
            navigationLinks.forEach(
                (link) => {
                    const href =
                        link.getAttribute(
                            "href"
                        );

                    const isActive =
                        href ===
                        `#${sectionId}`;

                    link.classList.toggle(
                        "active",
                        isActive
                    );

                    if (isActive) {
                        link.setAttribute(
                            "aria-current",
                            "page"
                        );
                    } else {
                        link.removeAttribute(
                            "aria-current"
                        );
                    }
                }
            );
        };

    if (
        "IntersectionObserver" in window &&
        observedSections.length
    ) {
        const sectionObserver =
            new IntersectionObserver(
                (entries) => {
                    const visibleSections =
                        entries
                            .filter((entry) => {
                                return (
                                    entry
                                        .isIntersecting
                                );
                            })
                            .sort((
                                first,
                                second
                            ) => {
                                return (
                                    second
                                        .intersectionRatio -
                                    first
                                        .intersectionRatio
                                );
                            });

                    if (
                        visibleSections.length
                    ) {
                        updateActiveNavigation(
                            visibleSections[0]
                                .target.id
                        );
                    }
                },
                {
                    root: null,

                    rootMargin:
                        "-25% 0px -60% 0px",

                    threshold: [
                        0.05,
                        0.2,
                        0.4,
                        0.6
                    ]
                }
            );

        observedSections.forEach(
            (section) => {
                sectionObserver.observe(
                    section
                );
            }
        );
    }


    /* =====================================================
       8. SCROLL REVEAL ANIMATIONS
    ====================================================== */

    const initializeRevealAnimations =
        () => {
            if (!revealElements.length) {
                return;
            }

            if (
                prefersReducedMotion.matches ||
                !(
                    "IntersectionObserver"
                    in window
                )
            ) {
                revealElements.forEach(
                    (element) => {
                        element.classList.add(
                            "is-visible"
                        );
                    }
                );

                return;
            }

            body.classList.add(
                "reveal-ready"
            );

            const revealObserver =
                new IntersectionObserver(
                    (
                        entries,
                        observer
                    ) => {
                        entries.forEach(
                            (entry) => {
                                if (
                                    !entry
                                        .isIntersecting
                                ) {
                                    return;
                                }

                                entry.target
                                    .classList.add(
                                        "is-visible"
                                    );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        );
                    },
                    {
                        root: null,

                        rootMargin:
                            "0px 0px -8% 0px",

                        threshold: 0.1
                    }
                );

            revealElements.forEach(
                (
                    element,
                    index
                ) => {
                    const delay =
                        Math.min(
                            (index % 3) *
                                80,
                            160
                        );

                    element.style
                        .transitionDelay =
                            `${delay}ms`;

                    revealObserver.observe(
                        element
                    );
                }
            );
        };

    initializeRevealAnimations();


    /* =====================================================
       9. FAQ ACCORDION
    ====================================================== */

    const closeFaqItem = (item) => {
        const button =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );

        item.classList.remove(
            "active"
        );

        button?.setAttribute(
            "aria-expanded",
            "false"
        );

        if (answer) {
            answer.style.maxHeight =
                "0px";
        }
    };

    const openFaqItem = (item) => {
        const button =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );

        item.classList.add(
            "active"
        );

        button?.setAttribute(
            "aria-expanded",
            "true"
        );

        if (answer) {
            answer.style.maxHeight =
                `${answer.scrollHeight}px`;
        }
    };

    faqItems.forEach((item) => {
        const button =
            item.querySelector(
                ".faq-question"
            );

        if (!button) {
            return;
        }

        button.addEventListener(
            "click",
            () => {
                const itemIsOpen =
                    item.classList.contains(
                        "active"
                    );

                faqItems.forEach(
                    (faqItem) => {
                        closeFaqItem(
                            faqItem
                        );
                    }
                );

                if (!itemIsOpen) {
                    openFaqItem(item);
                }
            }
        );
    });

    const updateOpenFaqHeight =
        debounce(() => {
            const activeFaqItem =
                document.querySelector(
                    ".faq-item.active"
                );

            const activeAnswer =
                activeFaqItem
                    ?.querySelector(
                        ".faq-answer"
                    );

            if (activeAnswer) {
                activeAnswer.style
                    .maxHeight =
                        `${activeAnswer.scrollHeight}px`;
            }
        });

    window.addEventListener(
        "resize",
        updateOpenFaqHeight
    );


    /* =====================================================
       10. PROCESS STEP INTERACTION
    ====================================================== */

    const activateProcessStep = (
        selectedStep
    ) => {
        processSteps.forEach(
            (step) => {
                step.classList.toggle(
                    "active",
                    step === selectedStep
                );
            }
        );
    };

    processSteps.forEach((step) => {
        step.setAttribute(
            "tabindex",
            "0"
        );

        step.addEventListener(
            "mouseenter",
            () => {
                activateProcessStep(
                    step
                );
            }
        );

        step.addEventListener(
            "focusin",
            () => {
                activateProcessStep(
                    step
                );
            }
        );

        step.addEventListener(
            "click",
            () => {
                activateProcessStep(
                    step
                );
            }
        );

        step.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key ===
                        "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();

                    activateProcessStep(
                        step
                    );
                }
            }
        );
    });

    if (
        "IntersectionObserver" in window &&
        processSteps.length
    ) {
        const processObserver =
            new IntersectionObserver(
                (entries) => {
                    const visibleStep =
                        entries
                            .filter(
                                (entry) => {
                                    return (
                                        entry
                                            .isIntersecting
                                    );
                                }
                            )
                            .sort((
                                first,
                                second
                            ) => {
                                return (
                                    second
                                        .intersectionRatio -
                                    first
                                        .intersectionRatio
                                );
                            })[0];

                    if (visibleStep) {
                        activateProcessStep(
                            visibleStep.target
                        );
                    }
                },
                {
                    rootMargin:
                        "-30% 0px -40% 0px",

                    threshold: [
                        0.2,
                        0.5,
                        0.75
                    ]
                }
            );

        processSteps.forEach(
            (step) => {
                processObserver.observe(
                    step
                );
            }
        );
    }


    /* =====================================================
       11. PRICING PACKAGE SELECTION
    ====================================================== */

    const setSelectFieldValue = (
        selectField,
        value
    ) => {
        if (
            !selectField ||
            !value
        ) {
            return false;
        }

        const matchingOption =
            Array.from(
                selectField.options
            ).find((option) => {
                return (
                    option.value === value
                );
            });

        if (!matchingOption) {
            return false;
        }

        selectField.value = value;

        selectField.dispatchEvent(
            new Event(
                "change",
                {
                    bubbles: true
                }
            )
        );

        return true;
    };

    pricingSelectButtons.forEach(
        (button) => {
            button.addEventListener(
                "click",
                () => {
                    const packageName =
                        button.dataset
                            .package ||
                        "website package";

                    const serviceValue =
                        button.dataset
                            .service ||
                        "";

                    const budgetValue =
                        button.dataset
                            .budget ||
                        "";

                    setSelectFieldValue(
                        projectTypeField,
                        serviceValue
                    );

                    setSelectFieldValue(
                        budgetField,
                        budgetValue
                    );

                    if (messageField) {
                        const existingMessage =
                            messageField
                                .value
                                .trim();

                        if (
                            !existingMessage
                        ) {
                            messageField.value =
                                `I'm interested in the ${packageName}. ` +
                                "I would like to discuss my business, " +
                                "website goals, required pages, features, " +
                                "and preferred project timeline.";

                            messageField
                                .dispatchEvent(
                                    new Event(
                                        "input",
                                        {
                                            bubbles:
                                                true
                                        }
                                    )
                                );
                        }
                    }

                    scrollToElement(
                        contactSection,
                        12
                    );

                    window.setTimeout(
                        () => {
                            document
                                .getElementById(
                                    "name"
                                )
                                ?.focus();
                        },
                        prefersReducedMotion
                            .matches
                            ? 0
                            : 650
                    );
                }
            );
        }
    );


    /* =====================================================
       12. HERO MOCKUP TILT
    ====================================================== */

    let heroTiltInitialized = false;

    const resetHeroTilt = () => {
        if (!browserWindow) {
            return;
        }

        browserWindow.style.transform =
            desktopPointer.matches
                ? `
                    perspective(1200px)
                    rotateY(-5deg)
                    rotateX(2deg)
                `
                : "";
    };

    const initializeHeroTilt = () => {
        if (
            heroTiltInitialized ||
            !heroVisual ||
            !browserWindow ||
            !desktopPointer.matches ||
            prefersReducedMotion.matches
        ) {
            resetHeroTilt();
            return;
        }

        heroTiltInitialized = true;

        heroVisual.addEventListener(
            "mousemove",
            (event) => {
                if (
                    !desktopPointer.matches
                ) {
                    return;
                }

                const bounds =
                    heroVisual
                        .getBoundingClientRect();

                const horizontalPosition =
                    (
                        event.clientX -
                        bounds.left
                    ) /
                    bounds.width;

                const verticalPosition =
                    (
                        event.clientY -
                        bounds.top
                    ) /
                    bounds.height;

                const rotateY =
                    -5 +
                    (
                        horizontalPosition -
                        0.5
                    ) *
                    8;

                const rotateX =
                    2 -
                    (
                        verticalPosition -
                        0.5
                    ) *
                    6;

                browserWindow.style
                    .transform = `
                        perspective(1200px)
                        rotateY(${rotateY}deg)
                        rotateX(${rotateX}deg)
                    `;
            }
        );

        heroVisual.addEventListener(
            "mouseleave",
            resetHeroTilt
        );
    };

    initializeHeroTilt();

    desktopPointer.addEventListener?.(
        "change",
        () => {
            resetHeroTilt();
            initializeHeroTilt();
        }
    );


    /* =====================================================
       13. CUSTOM CURSOR
    ====================================================== */

    let cursorAnimationFrame = null;
    let customCursorInitialized = false;

    const disableCustomCursor = () => {
        body.classList.remove(
            "custom-cursor-enabled"
        );

        customCursor?.classList.remove(
            "cursor-hover"
        );

        if (cursorAnimationFrame) {
            window.cancelAnimationFrame(
                cursorAnimationFrame
            );

            cursorAnimationFrame = null;
        }
    };

    const initializeCustomCursor = () => {
        if (
            customCursorInitialized ||
            !customCursor ||
            !customCursorDot ||
            !desktopPointer.matches ||
            prefersReducedMotion.matches
        ) {
            if (
                !desktopPointer.matches
            ) {
                disableCustomCursor();
            }

            return;
        }

        customCursorInitialized = true;

        body.classList.add(
            "custom-cursor-enabled"
        );

        let cursorX = 0;
        let cursorY = 0;
        let ringX = 0;
        let ringY = 0;

        const animateCursor = () => {
            if (
                !desktopPointer.matches
            ) {
                disableCustomCursor();
                return;
            }

            ringX +=
                (cursorX - ringX) *
                0.18;

            ringY +=
                (cursorY - ringY) *
                0.18;

            customCursor.style.left =
                `${ringX}px`;

            customCursor.style.top =
                `${ringY}px`;

            cursorAnimationFrame =
                window.requestAnimationFrame(
                    animateCursor
                );
        };

        document.addEventListener(
            "mousemove",
            (event) => {
                cursorX = event.clientX;
                cursorY = event.clientY;

                customCursorDot.style.left =
                    `${cursorX}px`;

                customCursorDot.style.top =
                    `${cursorY}px`;
            }
        );

        document
            .querySelectorAll(
                "a, button, input, " +
                "textarea, select, " +
                ".project-card, " +
                ".service-card, " +
                ".pricing-card"
            )
            .forEach((element) => {
                element.addEventListener(
                    "mouseenter",
                    () => {
                        customCursor
                            .classList.add(
                                "cursor-hover"
                            );
                    }
                );

                element.addEventListener(
                    "mouseleave",
                    () => {
                        customCursor
                            .classList.remove(
                                "cursor-hover"
                            );
                    }
                );
            });

        animateCursor();
    };

    initializeCustomCursor();

    desktopPointer.addEventListener?.(
        "change",
        (event) => {
            if (event.matches) {
                initializeCustomCursor();
            } else {
                disableCustomCursor();
            }
        }
    );


    /* =====================================================
       14. CONTACT FORM VALIDATION
    ====================================================== */

    if (contactForm) {
        const formFields = Array.from(
            contactForm.querySelectorAll(
                "input, select, textarea"
            )
        ).filter((field) => {
            return (
                field.name !==
                "company-website"
            );
        });

        const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );

        const submitButtonText =
            submitButton
                ?.querySelector("span");

        const originalButtonText =
            submitButtonText
                ?.textContent ||
            "Send Project Inquiry";

        const setFormStatus = (
            message,
            statusType = ""
        ) => {
            if (!formStatus) {
                return;
            }

            formStatus.textContent =
                message;

            formStatus.classList.remove(
                "success",
                "error"
            );

            if (statusType) {
                formStatus.classList.add(
                    statusType
                );
            }
        };

        const getFieldLabel = (
            field
        ) => {
            const label =
                field
                    .closest(
                        ".form-group"
                    )
                    ?.querySelector(
                        "label"
                    );

            if (!label) {
                return "This field";
            }

            const clonedLabel =
                label.cloneNode(true);

            clonedLabel
                .querySelectorAll("*")
                .forEach(
                    (element) => {
                        element.remove();
                    }
                );

            return (
                clonedLabel
                    .textContent
                    .trim() ||
                "This field"
            );
        };

        const setFieldError = (
            field,
            message
        ) => {
            const formGroup =
                field.closest(
                    ".form-group"
                );

            const errorElement =
                formGroup?.querySelector(
                    ".form-error"
                );

            field.classList.add(
                "invalid"
            );

            field.setAttribute(
                "aria-invalid",
                "true"
            );

            if (errorElement) {
                errorElement.textContent =
                    message;

                if (!errorElement.id) {
                    errorElement.id =
                        `${
                            field.id ||
                            field.name
                        }-error`;
                }

                field.setAttribute(
                    "aria-describedby",
                    errorElement.id
                );
            }
        };

        const clearFieldError = (
            field
        ) => {
            const formGroup =
                field.closest(
                    ".form-group"
                );

            const errorElement =
                formGroup?.querySelector(
                    ".form-error"
                );

            field.classList.remove(
                "invalid"
            );

            field.removeAttribute(
                "aria-invalid"
            );

            field.removeAttribute(
                "aria-describedby"
            );

            if (errorElement) {
                errorElement.textContent =
                    "";
            }
        };

        const isValidEmail = (
            emailAddress
        ) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
                emailAddress
            );
        };

        const isValidPhone = (
            phoneNumber
        ) => {
            const numbersOnly =
                phoneNumber.replace(
                    /\D/g,
                    ""
                );

            return (
                numbersOnly.length >= 7 &&
                numbersOnly.length <= 15
            );
        };

        const isValidWebsite = (
            websiteAddress
        ) => {
            try {
                const normalizedAddress =
                    /^https?:\/\//i.test(
                        websiteAddress
                    )
                        ? websiteAddress
                        : `https://${websiteAddress}`;

                const parsedUrl =
                    new URL(
                        normalizedAddress
                    );

                return Boolean(
                    parsedUrl.hostname &&
                    parsedUrl.hostname
                        .includes(".")
                );
            } catch {
                return false;
            }
        };

        const validateField = (
            field
        ) => {
            const value =
                field.value.trim();

            clearFieldError(field);

            if (
                field.required &&
                !value
            ) {
                setFieldError(
                    field,
                    `${getFieldLabel(field)} is required.`
                );

                return false;
            }

            if (
                field.id === "name" &&
                value &&
                value.length < 2
            ) {
                setFieldError(
                    field,
                    "Please enter your full name."
                );

                return false;
            }

            if (
                field.type === "email" &&
                value &&
                !isValidEmail(value)
            ) {
                setFieldError(
                    field,
                    "Please enter a valid email address."
                );

                return false;
            }

            if (
                field.type === "tel" &&
                value &&
                !isValidPhone(value)
            ) {
                setFieldError(
                    field,
                    "Please enter a valid phone number."
                );

                return false;
            }

            if (
                field.type === "url" &&
                value &&
                !isValidWebsite(value)
            ) {
                setFieldError(
                    field,
                    "Please enter a valid website address."
                );

                return false;
            }

            if (
                field.id === "message" &&
                value &&
                value.length < 10
            ) {
                setFieldError(
                    field,
                    "Please provide a little more information about your project."
                );

                return false;
            }

            return true;
        };

        formFields.forEach(
            (field) => {
                field.addEventListener(
                    "blur",
                    () => {
                        validateField(
                            field
                        );
                    }
                );

                field.addEventListener(
                    "input",
                    () => {
                        if (
                            field.classList
                                .contains(
                                    "invalid"
                                )
                        ) {
                            validateField(
                                field
                            );
                        }

                        setFormStatus("");
                    }
                );

                field.addEventListener(
                    "change",
                    () => {
                        if (
                            field.classList
                                .contains(
                                    "invalid"
                                )
                        ) {
                            validateField(
                                field
                            );
                        }

                        setFormStatus("");
                    }
                );
            }
        );


        /* =================================================
           15. FORM SUBMISSION
        ================================================= */

        contactForm.addEventListener(
            "submit",
            async (event) => {
                event.preventDefault();

                setFormStatus("");

                const fieldResults =
                    formFields.map(
                        (field) => {
                            return validateField(
                                field
                            );
                        }
                    );

                const formIsValid =
                    fieldResults.every(
                        Boolean
                    );

                if (!formIsValid) {
                    const firstInvalidField =
                        contactForm
                            .querySelector(
                                ".invalid"
                            );

                    setFormStatus(
                        "Please correct the highlighted fields before submitting.",
                        "error"
                    );

                    firstInvalidField
                        ?.focus();

                    return;
                }

                const honeypot =
                    contactForm
                        .querySelector(
                            '[name="company-website"]'
                        );

                if (
                    honeypot &&
                    honeypot.value.trim()
                ) {
                    contactForm.reset();

                    setFormStatus(
                        "Thank you. Your inquiry has been received.",
                        "success"
                    );

                    return;
                }

                const formAction = (
                    contactForm
                        .getAttribute(
                            "action"
                        ) ||
                    ""
                ).trim();

                const endpointIsMissing =
                    !formAction ||
                    formAction === "#" ||
                    formAction.includes(
                        "YOUR-FORM-ID"
                    ) ||
                    formAction.startsWith(
                        "javascript:"
                    );

                if (endpointIsMissing) {
                    setFormStatus(
                        "The contact form has not been connected yet. Add your Formspree endpoint to the form action in index.html.",
                        "error"
                    );

                    console.error(
                        "Contact form setup required: replace YOUR-FORM-ID with your real Formspree form ID."
                    );

                    return;
                }

                if (submitButton) {
                    submitButton.disabled =
                        true;

                    submitButton
                        .classList.add(
                            "loading"
                        );
                }

                if (submitButtonText) {
                    submitButtonText
                        .textContent =
                            "Sending...";
                }

                try {
                    const formData =
                        new FormData(
                            contactForm
                        );

                    const response =
                        await fetch(
                            formAction,
                            {
                                method:
                                    contactForm
                                        .method ||
                                    "POST",

                                body:
                                    formData,

                                headers: {
                                    Accept:
                                        "application/json"
                                }
                            }
                        );

                    if (!response.ok) {
                        let errorMessage =
                            "Your inquiry could not be sent. Please try again.";

                        try {
                            const responseData =
                                await response
                                    .json();

                            if (
                                Array.isArray(
                                    responseData
                                        .errors
                                ) &&
                                responseData
                                    .errors
                                    .length
                            ) {
                                errorMessage =
                                    responseData
                                        .errors
                                        .map(
                                            (
                                                error
                                            ) => {
                                                return (
                                                    error
                                                        .message
                                                );
                                            }
                                        )
                                        .join(" ");
                            } else if (
                                responseData
                                    .error
                            ) {
                                errorMessage =
                                    responseData
                                        .error;
                            }
                        } catch {
                            /*
                               The form service returned
                               a non-JSON error response.
                            */
                        }

                        throw new Error(
                            errorMessage
                        );
                    }

                    contactForm.reset();

                    formFields.forEach(
                        (field) => {
                            clearFieldError(
                                field
                            );
                        }
                    );

                    setFormStatus(
                        "Thank you! Your project inquiry was sent successfully. I’ll be in touch soon.",
                        "success"
                    );
                } catch (error) {
                    console.error(
                        "Form submission error:",
                        error
                    );

                    setFormStatus(
                        error instanceof Error
                            ? error.message
                            : "Something went wrong while sending your inquiry. Please try again.",
                        "error"
                    );
                } finally {
                    if (submitButton) {
                        submitButton.disabled =
                            false;

                        submitButton
                            .classList.remove(
                                "loading"
                            );
                    }

                    if (submitButtonText) {
                        submitButtonText
                            .textContent =
                                originalButtonText;
                    }
                }
            }
        );
    }


    /* =====================================================
       16. CLEANUP BEFORE LEAVING PAGE
    ====================================================== */

    window.addEventListener(
        "beforeunload",
        () => {
            if (
                cursorAnimationFrame
            ) {
                window
                    .cancelAnimationFrame(
                        cursorAnimationFrame
                    );
            }
        },
        {
            once: true
        }
    );
});