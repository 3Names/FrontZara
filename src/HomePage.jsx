import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useLanguage } from './Languages';

export default function HomePage({ data }) {
    const { t } = useLanguage();
    const [likedPosts, setLikedPosts] = useState([]);
    const [showCommentForm, setShowCommentForm] = useState([]);
    const [showCommentList, setShowCommentList] = useState([]);
    const [commentTexts, setCommentTexts] = useState({});
    const [likes, setLikes] = useState(() =>
        Object.fromEntries((data?.publicaciones || []).map((p) => [p.id, p.likes || 0]))
    );
    const [commentCounts, setCommentCounts] = useState(() =>
        Object.fromEntries((data?.publicaciones || []).map((p) => [p.id, p.comments || 0]))
    );
    const [commentLists, setCommentLists] = useState(() =>
        Object.fromEntries(
            (data?.publicaciones || []).map((p) => [
                p.id,
                Array.from({ length: p.comments || 0 }, (_, i) => ({
                    id: `${p.id}-${i}`,
                    author: p.nickname,
                    text: `Comentario ${i + 1}`,
                })),
            ])
        )
    );

    const toggleLike = (id) => {
        const isLiked = likedPosts.includes(id);
        setLikes((currentLikes) => ({
            ...currentLikes,
            [id]: Math.max(0, currentLikes[id] + (isLiked ? -1 : 1)),
        }));
        setLikedPosts((prev) =>
            isLiked ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleCommentForm = (id) => {
        setShowCommentForm((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleCommentList = (id) => {
        setShowCommentList((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleCommentText = (id, value) => {
        setCommentTexts((prev) => ({ ...prev, [id]: value }));
    };

    const handleCommentSubmit = (event, id) => {
        event.preventDefault();
        const comment = (commentTexts[id] || '').trim();
        if (!comment) return;

        setCommentLists((prev) => ({
            ...prev,
            [id]: [
                ...prev[id],
                {
                    id: `${id}-${Date.now()}`,
                    author: data?.session?.nickname || 'You',
                    text: comment,
                },
            ],
        }));

        setCommentCounts((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));

        setCommentTexts((prev) => ({ ...prev, [id]: '' }));
        setShowCommentList((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };

    return (
        <>
            <Header>
            </Header>

            <div className="container">
                <Sidebar />

                <div className="main">
                    {data?.mensaje && <p className="ok">{data.mensaje}</p>}
                    {data?.error && <p className="error">{data.error}</p>}

                    {!data?.publicaciones || data.publicaciones.length === 0 ? (
                        <div className="post">
                            <p>{t('no_posts')}</p>
                        </div>
                    ) : (
                        data.publicaciones.map((p) => (
                            <div className="post" key={p.id}>
                                <div className="post-header">
                                    <Link to={`/profile/${p.idUsuario}`} className="profile-link">
                                        <img src={p.usuario_foto ? `/images/${p.usuario_foto}` : '/images/user.png'} alt={p.nickname} className="avatar" />
                                    </Link>
                                    <div>
                                        <Link to={`/profile/${p.idUsuario}`} className="profile-link">
                                            <div className="post-author">{p.nickname}</div>
                                        </Link>
                                        <div className="post-meta">
                                            {new Date(p.fecha).toLocaleString('es-ES')}
                                        </div>
                                    </div>
                                </div>

                                <div className="post-content">{p.contenido}</div>

                                {showCommentForm.includes(p.id) && (
                                    <div className="comment-section">
                                        <form onSubmit={(event) => handleCommentSubmit(event, p.id)}>
                                            <textarea
                                                placeholder={t('type_message')}
                                                rows={2}
                                                value={commentTexts[p.id] || ''}
                                                onChange={(event) => handleCommentText(p.id, event.target.value)}
                                            ></textarea>
                                            <button type="submit">{t('comment')}</button>
                                        </form>
                                    </div>
                                )}

                                <div className="post-actions">
                                    <button
                                        className={`like-btn ${likedPosts.includes(p.id) ? 'liked' : ''}`}
                                        onClick={() => toggleLike(p.id)}
                                        title={t('like')}
                                    >
                                        ❤️ {likes[p.id] || 0}
                                    </button>
                                    <button
                                        className="comment-btn"
                                        onClick={() => toggleCommentForm(p.id)}
                                        title={t('comment')}
                                    >
                                        💬
                                    </button>
                                    <button
                                        className="comment-count-btn"
                                        onClick={() => toggleCommentList(p.id)}
                                        title={t('comments')}
                                    >
                                        {commentCounts[p.id] || 0} {t('comments')}
                                    </button>
                                    <div className="menu-container" style={{ position: 'relative' }}>
                                        <button
                                            className="menu-btn"
                                            title="More options"
                                            onClick={(event) => {
                                                const next = event.currentTarget.nextElementSibling;
                                                next?.classList.toggle('show');
                                            }}
                                        >
                                            ⋮
                                        </button>
                                        <div className="menu-options">
                                            {(data?.session?.rol === 'admin' || p.idUsuario === data?.session?.id) && (
                                                <button
                                                    className="danger"
                                                    onClick={() => {
                                                        if (confirm('¿Seguro que quieres eliminar esta publicación?')) {
                                                            window.location.href = '/eliminar/' + p.id;
                                                        }
                                                    }}
                                                >
                                                    {t('delete')}
                                                </button>
                                            )}
                                            <button>Reportar</button>
                                        </div>
                                    </div>
                                </div>
                                {showCommentList.includes(p.id) && (
                                    <div className="comment-list">
                                        {commentLists[p.id]?.length > 0 ? (
                                            commentLists[p.id].map((comment) => (
                                                <div className="comment-item" key={comment.id}>
                                                    <strong>{comment.author}:</strong> {comment.text}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-comments">{t('no_comments')}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
