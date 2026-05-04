import { NavLink } from 'react-router-dom';
import { useLanguage } from './Languages';

export default function Sidebar() {
    const { t } = useLanguage();

    return (
        <div className="sidebar">
            <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('home')}
            </NavLink>
            <NavLink to="/crear" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('create')}
            </NavLink>
            <NavLink to="/notifications" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('notifications')}
            </NavLink>
            <NavLink to="/messages" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('messages')}
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('settings')}
            </NavLink>

            <div className="logout">
                <NavLink to="/logout">{t('logout')}</NavLink>
            </div>
        </div>
    );
}
