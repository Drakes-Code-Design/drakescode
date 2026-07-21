/* =========================================================
   DRAKES CODE & DESIGN
   MAIN JAVASCRIPT FILE
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       1. ELEMENT REFERENCES
    ====================================================== */

    const body = document.body;
    const header = document.getElementById("site-header");

    const mobileMenuButton =
        document.getElementById("mobile-menu-button");

    const mobileNavigation =
        document.getElementById("mobile-navigation");

    const navigationLinks = document.querySelectorAll(
        ".desktop-navigation a, .mobile-navigation a"
    );

    const faqItems = document.querySelectorAll(".faq-item");
    const revealElements = document.querySelectorAll("[data-reveal]");
    const processSteps = document.querySelectorAll(".process-step");

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    const currentYear = document.getElementById("current-year");

    const customCursor = document.querySelector(".custom-cursor");
    const customCursorDot = document.querySelector(".custom-cursor-dot");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const desktopPointer = window.matchMedia(
        "(min-width: 961px) and (hover: hover) and (pointer: fine)"
    );


    /* =====================================================
       2. CURRENT YEAR
    ====================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       3. STICKY HEADER
    ====================================================== */

    const updateHeader = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("scrolled", window.scrollY > 30);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       4. MOBILE NAVIGATION
    ====================================================== */

    const openMobileMenu = () => {
        if (!mobileMenuButton || !mobileNavigation) {
            return;
        }

        body.classList.add("menu-open");
        mobileMenuButton.classList.add("active");
        mobileNavigation.classList.add("open");

        mobileMenuButton.setAttribute("aria-expanded", "true");
        mobileMenuButton.setAttribute(
            "aria-label",
            "Close navigation menu"
        );
    };

    const closeMobileMenu = () => {
        if (!mobileMenuButton || !mobileNavigation) {
            return;
        }

        body.classList.remove("menu-open");
        mobileMenuButton.classList.remove("active");
        mobileNavigation.classList.remove("open");

        mobileMenuButton.setAttribute("aria-expanded", "false");
        mobileMenuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    };

    const toggleMobileMenu = () => {
        const menuIsOpen = body.classList.contains("menu-open");

        if (menuIsOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    };

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener(
            "click",
            toggleMobileMenu
        );
    }

    if (mobileNavigation) {
        mobileNavigation
            .querySelectorAll("a")
            .forEach((link) => {
                link.addEventListener("click", closeMobileMenu);
            });
    }

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            body.classList.contains("menu-open")
        ) {
            closeMobileMenu();

            if (mobileMenuButton) {
                mobileMenuButton.focus();
            }
        }
    });

    document.addEventListener("click", (event) => {
        if (
            !body.classList.contains("menu-open") ||
            !header
        ) {
            return;
        }

        if (!header.contains(event.target)) {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 960) {
            closeMobileMenu();
        }
    });


    /* =====================================================
       5. SMOOTH INTERNAL NAVIGATION
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const targetSection =
                    document.querySelector(targetId);

                if (!targetSection) {
                    return;
                }

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: prefersReducedMotion.matches
                        ? "auto"
                        : "smooth",
                    block: "start"
                });

                if (
                    history.pushState &&
                    targetId !== "#home"
                ) {
                    history.pushState(null, "", targetId);
                }
            });
        });


    /* =====================================================
       6. ACTIVE NAVIGATION SECTION
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
        .map((sectionId) =>
            document.getElementById(sectionId)
        )
        .filter(Boolean);

    const updateActiveNavigation = (sectionId) => {
        navigationLinks.forEach((link) => {
            const href = link.getAttribute("href");
            const isActive = href === `#${sectionId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    if (
        "IntersectionObserver" in window &&
        observedSections.length
    ) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            second.intersectionRatio -
                            first.intersectionRatio
                    );

                if (visibleEntries.length) {
                    updateActiveNavigation(
                        visibleEntries[0].target.id
                    );
                }
            },
            {
                root: null,
                rootMargin: "-25% 0px -60% 0px",
                threshold: [0.05, 0.2, 0.4, 0.6]
            }
        );

        observedSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    /* =====================================================
       7. SCROLL REVEAL ANIMATIONS
    ====================================================== */

    const initializeRevealAnimations = () => {
        if (!revealElements.length) {
            return;
        }

        if (
            prefersReducedMotion.matches ||
            !("IntersectionObserver" in window)
        ) {
            revealElements.forEach((element) => {
                element.classList.add("is-visible");
            });

            return;
        }

        body.classList.add("reveal-ready");

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                root: null,
                rootMargin: "0px 0px -10% 0px",
                threshold: 0.12
            }
        );

        revealElements.forEach((element, index) => {
            const delay = Math.min((index % 3) * 90, 180);

            element.style.transitionDelay = `${delay}ms`;
            revealObserver.observe(element);
        });
    };

    initializeRevealAnimations();


    /* =====================================================
       8. FAQ ACCORDION
    ====================================================== */

    const closeFaqItem = (item) => {
        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        item.classList.remove("active");

        if (button) {
            button.setAttribute("aria-expanded", "false");
        }

        if (answer) {
            answer.style.maxHeight = "0px";
        }
    };

    const openFaqItem = (item) => {
        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        item.classList.add("active");

        if (button) {
            button.setAttribute("aria-expanded", "true");
        }

        if (answer) {
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
    };

    faqItems.forEach((item) => {
        const button = item.querySelector(".faq-question");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            const itemIsOpen =
                item.classList.contains("active");

            faqItems.forEach((faqItem) => {
                closeFaqItem(faqItem);
            });

            if (!itemIsOpen) {
                openFaqItem(item);
            }
        });
    });

    window.addEventListener("resize", () => {
        const activeFaqItem =
            document.querySelector(".faq-item.active");

        if (!activeFaqItem) {
            return;
        }

        const activeAnswer =
            activeFaqItem.querySelector(".faq-answer");

        if (activeAnswer) {
            activeAnswer.style.maxHeight =
                `${activeAnswer.scrollHeight}px`;
        }
    });


    /* =====================================================
       9. PROCESS STEP INTERACTIONS
    ====================================================== */

    const activateProcessStep = (selectedStep) => {
        processSteps.forEach((step) => {
            step.classList.toggle(
                "active",
                step === selectedStep
            );
        });
    };

    processSteps.forEach((step) => {
        step.setAttribute("tabindex", "0");

        step.addEventListener("mouseenter", () => {
            activateProcessStep(step);
        });

        step.addEventListener("focusin", () => {
            activateProcessStep(step);
        });

        step.addEventListener("click", () => {
            activateProcessStep(step);
        });
    });

    if (
        "IntersectionObserver" in window &&
        processSteps.length
    ) {
        const processObserver = new IntersectionObserver(
            (entries) => {
                const visibleStep = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            second.intersectionRatio -
                            first.intersectionRatio
                    )[0];

                if (visibleStep) {
                    activateProcessStep(
                        visibleStep.target
                    );
                }
            },
            {
                rootMargin: "-35% 0px -40% 0px",
                threshold: [0.2, 0.5, 0.75]
            }
        );

        processSteps.forEach((step) => {
            processObserver.observe(step);
        });
    }


    /* =====================================================
       10. HERO MOCKUP TILT EFFECT
    ====================================================== */

    const heroVisual = document.querySelector(".hero-visual");
    const browserWindow =
        document.querySelector(".browser-window");

    const initializeHeroTilt = () => {
        if (
            !heroVisual ||
            !browserWindow ||
            !desktopPointer.matches ||
            prefersReducedMotion.matches
        ) {
            return;
        }

        heroVisual.addEventListener("mousemove", (event) => {
            const bounds =
                heroVisual.getBoundingClientRect();

            const horizontalPosition =
                (event.clientX - bounds.left) /
                bounds.width;

            const verticalPosition =
                (event.clientY - bounds.top) /
                bounds.height;

            const rotateY =
                -5 + (horizontalPosition - 0.5) * 8;

            const rotateX =
                2 - (verticalPosition - 0.5) * 6;

            browserWindow.style.transform = `
                perspective(1200px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
            `;
        });

        heroVisual.addEventListener("mouseleave", () => {
            browserWindow.style.transform = `
                perspective(1200px)
                rotateY(-5deg)
                rotateX(2deg)
            `;
        });
    };

    initializeHeroTilt();


    /* =====================================================
       11. CUSTOM CURSOR
    ====================================================== */

    const initializeCustomCursor = () => {
        if (
            !customCursor ||
            !customCursorDot ||
            !desktopPointer.matches ||
            prefersReducedMotion.matches
        ) {
            return;
        }

        body.classList.add("custom-cursor-enabled");

        let cursorX = 0;
        let cursorY = 0;
        let ringX = 0;
        let ringY = 0;
        let animationFrameId = null;

        const animateCursor = () => {
            ringX += (cursorX - ringX) * 0.18;
            ringY += (cursorY - ringY) * 0.18;

            customCursor.style.left = `${ringX}px`;
            customCursor.style.top = `${ringY}px`;

            animationFrameId =
                window.requestAnimationFrame(
                    animateCursor
                );
        };

        document.addEventListener("mousemove", (event) => {
            cursorX = event.clientX;
            cursorY = event.clientY;

            customCursorDot.style.left =
                `${cursorX}px`;

            customCursorDot.style.top =
                `${cursorY}px`;
        });

        document
            .querySelectorAll(
                "a, button, input, textarea, select, .project-card, .service-card"
            )
            .forEach((interactiveElement) => {
                interactiveElement.addEventListener(
                    "mouseenter",
                    () => {
                        customCursor.classList.add(
                            "cursor-hover"
                        );
                    }
                );

                interactiveElement.addEventListener(
                    "mouseleave",
                    () => {
                        customCursor.classList.remove(
                            "cursor-hover"
                        );
                    }
                );
            });

        animateCursor();

        window.addEventListener(
            "beforeunload",
            () => {
                if (animationFrameId) {
                    window.cancelAnimationFrame(
                        animationFrameId
                    );
                }
            },
            {
                once: true
            }
        );
    };

    initializeCustomCursor();


    /* =====================================================
       12. CONTACT FORM VALIDATION
    ====================================================== */

    if (contactForm) {
        const formFields = Array.from(
            contactForm.querySelectorAll(
                "input, select, textarea"
            )
        ).filter(
            (field) =>
                field.name !== "company-website"
        );

        const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );

        const submitButtonText =
            submitButton?.querySelector("span");

        const originalButtonText =
            submitButtonText?.textContent ||
            "Send Project Inquiry";

        const setFormStatus = (
            message,
            statusType = ""
        ) => {
            if (!formStatus) {
                return;
            }

            formStatus.textContent = message;
            formStatus.classList.remove(
                "success",
                "error"
            );

            if (statusType) {
                formStatus.classList.add(statusType);
            }
        };

        const setFieldError = (
            field,
            message
        ) => {
            const formGroup =
                field.closest(".form-group");

            const errorElement =
                formGroup?.querySelector(".form-error");

            field.classList.add("invalid");
            field.setAttribute("aria-invalid", "true");

            if (errorElement) {
                errorElement.textContent = message;
            }
        };

        const clearFieldError = (field) => {
            const formGroup =
                field.closest(".form-group");

            const errorElement =
                formGroup?.querySelector(".form-error");

            field.classList.remove("invalid");
            field.removeAttribute("aria-invalid");

            if (errorElement) {
                errorElement.textContent = "";
            }
        };

        const isValidEmail = (emailAddress) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
                emailAddress
            );
        };

        const isValidPhone = (phoneNumber) => {
            const numbersOnly =
                phoneNumber.replace(/\D/g, "");

            return (
                numbersOnly.length >= 7 &&
                numbersOnly.length <= 15
            );
        };

        const isValidWebsite = (websiteAddress) => {
            try {
                const normalizedAddress =
                    /^https?:\/\//i.test(
                        websiteAddress
                    )
                        ? websiteAddress
                        : `https://${websiteAddress}`;

                const parsedUrl =
                    new URL(normalizedAddress);

                return Boolean(
                    parsedUrl.hostname.includes(".")
                );
            } catch {
                return false;
            }
        };

        const validateField = (field) => {
            const value = field.value.trim();

            clearFieldError(field);

            if (field.required && !value) {
                const fieldLabel =
                    field
                        .closest(".form-group")
                        ?.querySelector("label")
                        ?.childNodes[0]
                        ?.textContent
                        ?.trim() ||
                    "This field";

                setFieldError(
                    field,
                    `${fieldLabel} is required.`
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

        formFields.forEach((field) => {
            field.addEventListener("blur", () => {
                validateField(field);
            });

            field.addEventListener("input", () => {
                if (field.classList.contains("invalid")) {
                    validateField(field);
                }

                setFormStatus("");
            });

            field.addEventListener("change", () => {
                if (field.classList.contains("invalid")) {
                    validateField(field);
                }

                setFormStatus("");
            });
        });


        /* =================================================
           13. ASYNCHRONOUS FORM SUBMISSION

           Formspree example:
           action="https://formspree.io/f/abcxyz"

           Do not leave the action as "#".
        ================================================= */

        contactForm.addEventListener(
            "submit",
            async (event) => {
                event.preventDefault();

                setFormStatus("");

                const fieldResults =
                    formFields.map((field) =>
                        validateField(field)
                    );

                const formIsValid =
                    fieldResults.every(Boolean);

                if (!formIsValid) {
                    const firstInvalidField =
                        contactForm.querySelector(
                            ".invalid"
                        );

                    setFormStatus(
                        "Please correct the highlighted fields before submitting.",
                        "error"
                    );

                    firstInvalidField?.focus();

                    return;
                }

                const honeypot =
                    contactForm.querySelector(
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
                    contactForm.getAttribute("action") ||
                    ""
                ).trim();

                if (
                    !formAction ||
                    formAction === "#" ||
                    formAction.startsWith(
                        "javascript:"
                    )
                ) {
                    setFormStatus(
                        "The contact form has not been connected yet. Add your Formspree endpoint to the form action in index.html.",
                        "error"
                    );

                    console.error(
                        'Contact form setup required: replace action="#" with your Formspree endpoint.'
                    );

                    return;
                }

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.classList.add("loading");
                }

                if (submitButtonText) {
                    submitButtonText.textContent =
                        "Sending...";
                }

                try {
                    const formData =
                        new FormData(contactForm);

                    const response = await fetch(
                        formAction,
                        {
                            method:
                                contactForm.method ||
                                "POST",
                            body: formData,
                            headers: {
                                Accept: "application/json"
                            }
                        }
                    );

                    if (!response.ok) {
                        let errorMessage =
                            "Your inquiry could not be sent. Please try again.";

                        try {
                            const responseData =
                                await response.json();

                            if (
                                Array.isArray(
                                    responseData.errors
                                ) &&
                                responseData.errors.length
                            ) {
                                errorMessage =
                                    responseData.errors
                                        .map(
                                            (error) =>
                                                error.message
                                        )
                                        .join(" ");
                            } else if (
                                responseData.error
                            ) {
                                errorMessage =
                                    responseData.error;
                            }
                        } catch {
                            /* The response was not JSON. */
                        }

                        throw new Error(errorMessage);
                    }

                    contactForm.reset();

                    formFields.forEach((field) => {
                        clearFieldError(field);
                    });

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
                        error.message ||
                        "Something went wrong while sending your inquiry. Please try again.",
                        "error"
                    );
                } finally {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.classList.remove(
                            "loading"
                        );
                    }

                    if (submitButtonText) {
                        submitButtonText.textContent =
                            originalButtonText;
                    }
                }
            }
        );
    }
});