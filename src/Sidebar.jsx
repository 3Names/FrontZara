import { useLanguage } from './Languages';

export default function Sidebar() {
    const { t } = useLanguage();

    return (
        <div className="sidebar">
            <a href="/Home">{t('home')}</a>
            <a href="/crear">{t('create')}</a>
            <a href="/notifications">{t('notifications')}</a>
            <a href="/messages">{t('messages')}</a>
            <a href="/settings">{t('settings')}</a>

            <div className="logout">
                <a href="/logout">{t('logout')}</a>
            </div>
        </div>
    );
}
