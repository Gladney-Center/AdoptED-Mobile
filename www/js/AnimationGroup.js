// This class guarantees each animation runs only once.
// Can bind AnimationGroup.next() to an event to skip the delay.
// This is used in the app to allow users to "fast-forward" through the animations by tapping on the screen


class AnimationGroup {
    constructor(animation) {
        let _animation = animation;
        let _step = 0;
        this.next = function() {
            if (_step === 0) {
                _step = 1;
                _scheduler(this, _step, _animation[_step-1]);
            }
            else if (typeof(_animation[_step]) === 'function') {
                _animation[_step]();
                _step += 2;
                if(typeof(_animation[_step]) === 'function') {
                    _scheduler(this, _step, _animation[_step-1]);
                }
            }
        };
        let _scheduler = function(obj, step, delay) {
            setTimeout(function() {
                if (_step === step)
                    obj.next();
            }, delay);
        }
    }
}
