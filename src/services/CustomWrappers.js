import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export function withRouter(Component) {
    function Wrapper(props) {
        const navigate = useNavigate();
        const urlParams = useParams();
        const [searchParams] = useSearchParams();

        return (
            <Component
                navigate={navigate}
                urlParams={urlParams}
                queryParams={searchParams}
                {...props}
            />
        );
    };

    return Wrapper;
};

export function withTranslation(Component) {
    function Wrapper(props) {
        const { t } = useTranslation();

        return (
            <Component
                t={t}
                {...props}
            />
        );
    }

    return Wrapper;
}

export function withRouterAndTranslation(Component) {
    function Wrapper(props) {
        const navigate = useNavigate();
        const urlParams = useParams();
        const [searchParams] = useSearchParams();
        const { t } = useTranslation();

        return (
            <Component
                navigate={navigate}
                urlParams={urlParams}
                queryParams={searchParams}
                t={t}
                {...props}
            />
        );
    }

    return Wrapper;
}