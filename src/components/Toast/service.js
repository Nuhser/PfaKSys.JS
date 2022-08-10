import PfaksysToast from ".";

export function showToast({title, timestamp, variant, delay, closable, animation, body}) {
    const key = window.toastContainer.getToastKey(title);

    var date = new Date();
    if (!timestamp) {
        timestamp = date.toLocaleTimeString();
    }

    window.toastContainer.addToast(
        key,
        <PfaksysToast
            key={key}
            toastKey={key}
            title={title}
            timestamp={timestamp}
            variant={variant}
            delay={delay}
            closable={closable}
            animation={animation}
            body={body}
        />
    );
}

export function showErrorToast({title, timestamp, body}) {
    showToast({
        title: title,
        timestamp: timestamp,
        variant: 'error',
        body: body
    })
}

export function showInfoToast({title, timestamp, body}) {
    showToast({
        title: title,
        timestamp: timestamp,
        variant: 'info',
        body: body
    })
}

export function showSuccessToast({title, timestamp, body}) {
    showToast({
        title: title,
        timestamp: timestamp,
        variant: 'success',
        body: body
    })
}

export function showWarningToast({title, timestamp, body}) {
    showToast({
        title: title,
        timestamp: timestamp,
        variant: 'warning',
        body: body
    })
}