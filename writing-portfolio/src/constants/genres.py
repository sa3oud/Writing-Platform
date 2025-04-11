#!/usr/bin/env python3

# Definition of Writing Genres
GENRES = [
    'Fiction', 
    'Non-Fiction', 
    'Poetry', 
    'Essay', 
    'Short Story', 
    'Novel Excerpt', 
    'Blog Post', 
    'Science Fiction',
    'Fantasy',
    'Historical Fiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Horror',
    'Travel Writing',
    'Biography',
    'Memoir',
    'Philosophical',
    'Technical Writing',
    'Other'
]

def get_genres():
    """Returns the list of available writing genres."""
    return GENRES

def validate_genre(genre):
    """Validates if a given genre is in the list of genres."""
    return genre in GENRES

def add_genre(new_genre):
    """Adds a new genre to the list if it doesn't already exist."""
    if new_genre not in GENRES:
        GENRES.append(new_genre)
        return True
    return False

if __name__ == "__main__":
    print("Available Genres:")
    for genre in GENRES:
        print(f"- {genre}")
