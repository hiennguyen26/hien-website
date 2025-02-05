---
title: "ML-Powered Book Recommender"
context: "Personal Project - 3 months"
imageSrc: "/placeholder.svg?height=300&width=400"
---

# Machine Learning Book Recommender

A sophisticated recommendation engine that helps users discover their next favorite book using collaborative filtering and natural language processing.

## Technical Stack

| Component | Technology |
|-----------|------------|
| Backend | Python, FastAPI |
| ML Models | PyTorch, Scikit-learn |
| Database | PostgreSQL |
| Frontend | React, TypeScript |

## Key Features

### 1. Smart Recommendations
- Collaborative filtering using matrix factorization
- Content-based filtering using NLP
- Hybrid approach combining both methods

### 2. Performance Metrics

```python
# Example recommendation code
def get_recommendations(user_id: int) -> List[Book]:
    user_vector = user_embeddings[user_id]
    scores = cosine_similarity(user_vector, book_embeddings)
    return sorted(zip(books, scores), key=lambda x: x[1], reverse=True)[:10]
```

## Results

- **95%** accuracy in top-10 recommendations
- Serving *10,000+* users daily
- Processing over *1M* books

### User Feedback

> "The recommendations are spot-on! I've discovered so many great books I wouldn't have found otherwise."

## Future Improvements

1. Add real-time recommendation updates
2. Implement A/B testing framework
3. Enhance model with deep learning
4. Add social features 