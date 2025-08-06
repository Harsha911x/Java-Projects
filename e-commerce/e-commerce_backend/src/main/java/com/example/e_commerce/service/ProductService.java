package com.example.e_commerce.service;

import com.example.e_commerce.model.Product;
import com.example.e_commerce.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo service;
    public List<Product> getAllProducts() {

        return service.findAll();
    }

    public Product getProductById(int id) {

        return service.findById(id).orElse(null);
    }



    public Product addProduct(Product product, MultipartFile image) throws IOException {

        product.setImageName(image.getOriginalFilename());
        product.setImageType(image.getContentType());
        product.setImageData(image.getBytes());
        return service.save(product);
    }

    public Product updateProduct(Product product, MultipartFile imageFile) throws IOException {

        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return service.save(product);

    }


    public void deleteProduct(int id) {

        service.deleteById(id);

    }




    public List<Product> searchProducts(String keyword) {
        return service.searchProducts(keyword);
    }

}
