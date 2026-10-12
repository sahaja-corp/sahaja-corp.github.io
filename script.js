// Function to switch view with smooth entrance animation and active state updates
        function switchView(targetViewId) {
            const sections = document.querySelectorAll('.view-section');
            
            // Remove active to trigger re-animation
            sections.forEach(sec => {
                sec.classList.remove('active');
            });

            // Activate target section
            const activeSection = document.getElementById('view-' + targetViewId);
            if (activeSection) {
                activeSection.classList.add('active');
            }

            // Update active state on navbar links
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-target') === targetViewId) {
                    link.classList.add('active');
                }
            });

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Close mobile menu if expanded
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }

        // Custom alert toast function (avoiding alert())
        function showCustomAlert(message) {
            const alertBox = document.getElementById('customAlert');
            const alertMsg = document.getElementById('alertMessage');
            alertMsg.textContent = message;
            alertBox.style.display = 'block';
            setTimeout(() => {
                hideCustomAlert();
            }, 4000);
        }

        function hideCustomAlert() {
            const alertBox = document.getElementById('customAlert');
            alertBox.style.display = 'none';
        }

        // Show product details in modal
        function showProductDetail(title, desc, imgSrc) {
            document.getElementById('productModalTitle').textContent = title;
            document.getElementById('productModalHeading').textContent = title;
            document.getElementById('productModalDesc').textContent = desc;
            document.getElementById('productModalImg').src = imgSrc;

            const myModal = new bootstrap.Modal(document.getElementById('productModal'));
            myModal.show();
        }

        // Contact Form Validation
        function handleFormSubmit(event) {
            event.preventDefault();
            
            let isValid = true;
            const nama = document.getElementById('nama');
            const email = document.getElementById('email');
            const subjek = document.getElementById('subjek');
            const pesan = document.getElementById('pesan');

            [nama, email, subjek, pesan].forEach(el => el.classList.remove('is-invalid'));

            if (!nama.value.trim()) {
                nama.classList.add('is-invalid');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            }

            if (!subjek.value.trim()) {
                subjek.classList.add('is-invalid');
                isValid = false;
            }

            if (!pesan.value.trim() || pesan.value.trim().length < 10) {
                pesan.classList.add('is-invalid');
                isValid = false;
            }

            if (isValid) {
                showCustomAlert('Terima kasih! Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.');
                document.getElementById('contactForm').reset();
            }
        }