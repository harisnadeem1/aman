async function loadTimeline() {
  const timelineRoot = document.getElementById('timeline');
  if (!timelineRoot) return;

  try {
    const response = await fetch('./data/timeline.json');
    const items = await response.json();

    timelineRoot.innerHTML = items.map((item, index) => `
      <article class="timeline-item ${item.featured ? 'featured' : ''} reveal visible ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}">
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-card">
          <span class="timeline-label">${item.label}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>
    `).join('');
  } catch (error) {
    timelineRoot.innerHTML = '<p>Timeline data will appear here once your dates are added.</p>';
  }
}

loadTimeline();