Element.prototype.tilt = function (options) {

    // ----- config ----- //

    const config = {
        angle:            options?.angle            ?? 10,
        invert:           options?.invert           ?? false,
        perspective:      options?.perspective      ?? 1000,
        reset:            options?.reset            ?? true,
        scale:            options?.scale            ?? 1,
        transformElement: options?.transformElement ?  this.querySelector(options.transformElement) : this,
        transitionEasing: options?.transitionEasing ?? 'cubic-bezier(.03, .98, .52, .99)',
        transitionSpeed:  options?.transitionSpeed  ?? 1500,
    };

    let timeout;


    // ----- functions ----- //

    const setTransition = (el, config) => {
        if (typeof config.transitionSpeed === 'number') {
            config.transformElement.style.transition = `transform ${config.transitionSpeed}ms ${config.transitionEasing}`;

            if (timeout !== undefined) clearTimeout(timeout);

            timeout = setTimeout(() => {
                config.transformElement.style.transition = '';
            }, config.transitionSpeed);
        }
    };

    const handleOver = (e, config) => {
        let el = e.currentTarget;

        setTransition(el, config);

        if (typeof config.perspective === 'number') {
            el.style.setProperty('--tilt-perspective', `${config.perspective}px`);
        }

        if (typeof config.scale === 'number') {
            el.style.setProperty('--tilt-scale', `${config.scale}`);
        }
    };

    const handleMove = (e, config) => {
        let el = e.currentTarget;
        let rect = el.getBoundingClientRect();
        //console.log(config, el, rect);

        let x_pos = Math.ceil(e.clientX - rect.left);
        let y_pos = Math.ceil(e.clientY - rect.top);

        let w_half = rect.width / 2;
        let h_half = rect.height / 2;

        let x_rot = config.angle / h_half * (h_half - y_pos);
        let y_rot = config.angle / w_half * (w_half - x_pos);

        if (typeof config.invert === 'boolean' && config.invert) {
            x_rot *= -1;
            y_rot *= -1;
        }

        el.style.setProperty('--tilt-x', `${x_rot.toFixed(2) * -1}deg`);
        el.style.setProperty('--tilt-y', `${y_rot.toFixed(2)}deg`);
    };

    const handleOut = (e, config) => {
        let el = e.currentTarget;

        el.style.setProperty('--tilt-scale', 1);

        if (typeof config.reset === 'boolean' && config.reset) {
            el.style.setProperty('--tilt-x', '0deg');
            el.style.setProperty('--tilt-y', '0deg');
        }

        setTransition(el, config);
    };


    // ----- events ----- //

    this.addEventListener('mouseover', e => handleOver(e, config));
    this.addEventListener('mousemove', e => handleMove(e, config));
    this.addEventListener('mouseout', e => handleOut(e, config));


    // ----- initial styles ----- //

    config.transformElement.style.willChange = 'transform';
    config.transformElement.style.transform = 'perspective(var(--tilt-perspective)) scale(var(--tilt-scale)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))';
};
