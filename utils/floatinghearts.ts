const floatingHearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
    size: 20 + Math.random() * 30,
    xOffset: Math.random() * 100 - 50,
}));
export default floatingHearts;
