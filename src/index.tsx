import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {store} from "store/ReduxStore";
import {router} from "routing";
import {AuthProvider} from "provider/AuthProvider";
import {ProfileProvider} from "provider/ProfileProvider";
import 'view/assets/scss/clear.scss'
import 'view/assets/scss/variables.scss'
import 'view/assets/scss/slickSlider.scss'
import 'view/assets/scss/scrollBar.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <AuthProvider>
            <ProfileProvider>
                <RouterProvider router={router}/>
            </ProfileProvider>
        </AuthProvider>
    </Provider>
);
