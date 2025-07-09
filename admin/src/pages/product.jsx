 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {products.map((prod) => (
              <div key={prod._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                {prod.image && (
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg text-gray-800">{prod.name}</h3>
                    {prod.featured && (
                      <Star className="text-amber-500 fill-current" size={20} />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{prod.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Category: {prod.category || 'N/A'}</span>
                    <span>Weight: {prod.weight || 'N/A'}</span>
                  </div>
                  {prod.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-500 fill-current" size={16} />
                      <span className="font-medium">{prod.rating}</span>
                      {prod.reviews && (
                        <span className="text-gray-500">({prod.reviews} reviews)</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(prod)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>