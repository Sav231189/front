import {createBrowserRouter, Navigate} from "react-router-dom";
import {AppLayout} from "view/layout/AppLayout";
import {IsRequireHOC} from "routing/isRequireHOC";
import {TournamentLayout} from "view/layout/TournamentLayout";
import {RulesPage} from "view/pages/RulesPage";
import {TournamentListPage} from "view/pages/TournamentListPage";
import {TournamentPage} from "view/pages/TournamentPage";
import {PrizePage} from "view/pages/PrizePage";
import {SelectCategory} from "view/pages/SelectCategory";
import {AddResultPage} from "view/pages/addResultPage";
import {ProfilePage} from "view/pages/ProfilePage";
import {AdminLayout} from "view/layout/AdminLayout";
import {UserPage} from "view/pages/AdminPage/userPage";
import {AdminTournamentList} from "view/pages/AdminPage/tournamentList";
import {PartnerPage} from "view/pages/AdminPage/partnerPage";
import {EditTournament} from "view/pages/AdminPage/editTournament";
import {CategoryList} from "view/pages/AdminPage/categoryList";
import {ResultPage} from "view/pages/AdminPage/resultPage";
import {StatisticPage} from "view/pages/AdminPage/statisticPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <IsRequireHOC permissionRoles={['regular', 'guest', 'admin']}>
                    <AppLayout />
                </IsRequireHOC>
            ,
        errorElement: <Navigate to={`/`} />,
        children: [
            {
                path: "tournament",
                element: <IsRequireHOC permissionRoles={['regular', 'guest', 'admin']}>
                    <TournamentLayout />
                </IsRequireHOC>,
                errorElement: <Navigate to={`/`} />,
                children: [
                    {
                        path: "list",
                        element: <TournamentListPage />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: ":id",
                        element: <TournamentPage />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "rules/:id",
                        element: <RulesPage />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "prize/:id",
                        element: <PrizePage />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "select/:id",
                        element: <SelectCategory />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "add/:id",
                        element: <AddResultPage />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "",
                        element: <Navigate to={`/tournament/list`} />,
                        errorElement: <Navigate to={`/`} />,
                    },
                ]
            },
            {
                path: "admin",
                element: <IsRequireHOC
                    permissionRoles={['admin']}
                    permissionElement={<Navigate to={'/'} replace={true}/>}
                >
                    <AdminLayout />
                </IsRequireHOC>,
                errorElement: <Navigate to={`/`} />,
                children: [
                    {
                        path: "tournament",
                        element: <AdminTournamentList />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "tournament/edit/:id",
                        element: <EditTournament />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "tournament/edit",
                        element: <EditTournament />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "category-list/:id",
                        element: <CategoryList />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "result",
                        element: <ResultPage />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "user",
                        element: <UserPage />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "statistic",
                        element: <StatisticPage />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "partner",
                        element: <PartnerPage />,
                        errorElement: <Navigate to={`/`} />,
                    },
                    {
                        path: "",
                        element: <Navigate to={`user`} />,
                        errorElement: <Navigate to={`/`} />,
                    },
                ]
            },
            {
                path: "profile",
                element: <IsRequireHOC
                    permissionRoles={['regular','admin']}
                    permissionElement={<Navigate to={'/'} replace={true}/>}
                >
                    <ProfilePage />
                </IsRequireHOC>,
                errorElement: <Navigate to={`/`} />,
            },
            {
                path: "",
                element: <Navigate to={`/tournament`} />,
                errorElement: <Navigate to={`/`} />,
            },
        ]
    },
]);

